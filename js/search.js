---
# frontmatter comment
---

jQuery(function() {
  // get the generated search_data.json file so lunr.js can search it locally
  window.data = $.getJSON('/search_data.json');

  // declare empty array to temporarily store loaded data
  var store = [];

  // declare search query to display terms later
  var query;

  // wait for the data to load and add it to temporary store
  window.data.then(function(loaded_data){
    $.each(loaded_data, function(index, value){
      value.id = index;
      store.push(value);
    });

    // initialize lunr with the fields to be searched, add data from store
    window.idx = lunr(function () {
      this.ref('id');
      this.field('title');
      this.field('content', { boost: 10 });

      store.forEach(function(doc){
        this.add(doc);
      }, this);
    });
  });
  
  // event when the form is submitted
  $("#site_search").submit(function(event) {
    event.preventDefault();
    query = $("#search_box").val(); // get the value for the text field
    var results = window.idx.search(query); // get lunr to perform search
    display_search_results(results); // hand the results off to be displayed
  });

  function display_search_results(results) {
    var $search_results = $("#search_results");

    // wait for data to load
    window.data.then(function(loaded_data) {
      
      // are there any results?
      if (results.length) {
        $search_results.empty(); // clear any old results

        $search_results.html('<li class="results-header">' + results.length 
          + ' results found for "' + query + '"</li>');
        // iterate over the results
        results.forEach(function(result) {
          var item = loaded_data[result.ref];

          // build a snippet of HTML for this result
          var appendString = '<li class="result"><a class="title" href="' +
            item.url + '">' + item.title + '</a><br>' +
            item.content.substring(0, 250) + '...</li>';

          // add the snippet to the collection of results
          $search_results.append(appendString);
        });
      } else {
        // if there aren't any results, let the user know
        {% assign post = site.posts.last %}
        var head = '<li class="results-header">Uh oh, no results found for "' +
          query + '". Check out my latest post instead.</li>';
        var last = '<li class="result"><a class="title" href="{{ post.url }}">{{ post.title }}</a><br>{{ post.content | strip_html | truncatewords: 50 }}</li>';
        $search_results.html(head + last);
      }
    });
  }
});
