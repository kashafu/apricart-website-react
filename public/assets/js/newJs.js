// const opener = document.querySelectorAll(".opener");
// const cont = document.querySelectorAll(".content ");
// const arrow = document.querySelectorAll(".opener i");

// function dropdown(open, content , icon ){
//   for (let i = 0; i < open.length; i++) {
//     open[i].addEventListener("click", function(){
//       content[i].classList.toggle("content-active");
//       icon[i].classList.toggle("rotate");
//       for (var j = 0; j < open.length; j++) {
//         if(i != j){
//           content[j].classList.remove("content-active");
//           icon[j].classList.remove("rotate");
//         }
//       }
//     }); 
//   }
// }

// dropdown( opener, cont,  arrow ); 

//Order page
                              (function(document) {
                                  'use strict';
                              
                                  var TableFilter = (function(myArray) {
                                      var search_input;
                              
                                      function _onInputSearch(e) {
                                          search_input = e.target;
                                          var tables = document.getElementsByClassName(search_input.getAttribute('data-table'));
                                          myArray.forEach.call(tables, function(table) {
                                              myArray.forEach.call(table.tBodies, function(tbody) {
                                                  myArray.forEach.call(tbody.rows, function(row) {
                                                      var text_content = row.textContent.toLowerCase();
                                                      var search_val = search_input.value.toLowerCase();
                                                      row.style.display = text_content.indexOf(search_val) > -1 ? '' : 'none';
                                                  });
                                              });
                                          });
                                      }
                              
                                      return {
                                          init: function() {
                                              var inputs = document.getElementsByClassName('search-input');
                                              myArray.forEach.call(inputs, function(input) {
                                                  input.oninput = _onInputSearch;
                                              });
                                          }
                                      };
                                  })(Array.prototype);
                              
                                  document.addEventListener('readystatechange', function() {
                                      if (document.readyState === 'complete') {
                                          TableFilter.init();
                                      }
                                  });
                              
                              })(document);
                         




function openNav() {
  document.getElementById("mySidepanel").style.width = "400px";
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}
// personal information page start

function openNav1() {
  document.getElementById("myNav").style.height = "1000px";
}

function closeNav1() {
  document.getElementById("myNav").style.height = "0";
}


// personal information page end
//product add and remove in to 
$('.minus-btn').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());
 
    if (value && 1) {
        value = value - 1;
    } else {
        value = 0;
    }
 
  $input.val(value);
 
});
 
$('.plus-btn').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());
 
    if (value && 100) {
        value = value + 1;
    } else {
        value =1;
    }
 
    $input.val(value);
});

