$(document).ready(function() {
  const first = $("#first"),
    second = $("second"),
    third = $("third"),
    fourth = $("fourth"),
    fifth = $("fifth"),
    sixth = $("sixth"),
    side1 = $("side1"),
    side2 = $("side2"),
    side3 = $("side3"),
    side4 = $("side4"),
    side5 = $("side5"),
    side6 = $("side6"),
    mid1 = $("mid1"),
    mid2 = $("mid2"),
    mid3 = $("mid3"),
    hide = $("hide");

  hide.click(() => {
    console.log("click");
    mid1.className += "div-hidden";
  });

  //   setInterval(function() {
  //     $.ajax({
  //       url: URL,
  //       method: "GET",
  //       success: function(data) {
  //         console.log(data);
  //       }
  //     });
  //   }, 10000);
});
