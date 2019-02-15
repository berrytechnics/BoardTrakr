
  $('#search').keyup(()=>{
    $(".card-header:not(:contains("+$('#search').val()+"))").parent().slideUp()
    $(".card-header:contains("+$('#search').val()+")").parent().slideDown()
  })
