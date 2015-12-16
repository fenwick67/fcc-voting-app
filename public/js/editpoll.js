$(function(){
   
   
    var newOption = $($('#option-template').html());
    
    
    $('#addoption').on('click',function(){
        console.log('click!');
        $('#polloptions').append(newOption);
        newOption = newOption.clone();
    });
    

    $('body').on('click','.remove-button',function(){
      console.log(this);
      $(this).parent().parent().remove();
    })


    
})
