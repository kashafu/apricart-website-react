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

