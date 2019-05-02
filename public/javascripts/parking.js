$(document).ready(function() {
  const first = $("#first"),
    second = $("#second"),
    third = $("#third"),
    fourth = $("#fourth"),
    fifth = $("#fifth"),
    sixth = $("#sixth"),
    side1 = $("#side1"),
    side2 = $("#side2"),
    side3 = $("#side3"),
    side4 = $("#side4"),
    side5 = $("#side5"),
    side6 = $("#side6"),
    mid1 = $("#mid1"),
    mid2 = $("#mid2"),
    mid3 = $("#mid3"),
    hide = $("#hide");
  let ar = [1, 0, 0, 0, 1, 0];

  hide.click(() => {
    console.log("click");
    showPath(ar);
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
  function showPath(arr) {
    if (arr[0] == 1) {
      mid3.removeClass("hidden-div");
      mid2.removeClass("hidden-div");
      mid1.removeClass("hidden-div");
      side3.removeClass("hidden-div");
    }
    if (arr[4] == 1) {
      mid2.removeClass("hidden-div");
      mid1.removeClass("hidden-div");
      side3.removeClass("hidden-div");
      side5.removeClass("hidden-div");
    }
  }
});
