$(function(){
   
   
    var newOption = $('<div class="form-group">'+
  '<label for="polloption" class="col-sm-3 control-label">'+
    '<div class="col-sm-7">'+
      '<input placeholder="Password" class="form-control"/>'+
    '</div>'+
  '</label>'+
'</div>').clone();
    
    
    $('#addoption').on('click',function(){
        console.log('click!');
        $('#polloptions').append(newOption);
        newOption = newOption.clone();
    });
    




    
})
