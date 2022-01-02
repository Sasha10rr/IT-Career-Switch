// Creating List From DataBase
var profileVisible = false;
var departmentVisible = false;
var locationVisible = false;
var email;
var employeeList;
var checkButton =true;

$("#dropdownMenuButton1").css("display","inline");
$("#addLocation").css("display","none");
$("#Button").css("display","inline");
$.ajax({
    type: "POST",
    url: './php/getAll.php',
    data: {
        "type": "check"
    },
    success: function(response) { 
        $("#addDepartment").css("display","none"); 
        sortedList = Object(response.data).sort(function(a,b){  
            var aa = a.id;
            var    bb = b.id;
              return bb - aa
              }) 
 
        for(var i=0; i<sortedList.length; i++){
            checkButton =true;
            $("#list").append(`	<li   id="${response.data[i].id}" class="respon" onclick="showProfile(${response.data[i].id})"> 
            <label for="checkBox${i}">
            <input class="form-check" name="employeeCheckBox" type="checkbox" id="checkBox${i}">                 
            <a >
                <div class="message-avatar">
                    <img src="./images/profileImg.jpg" alt="">
                </div>
                <div class="message-body">
                    <div class="message-body-heading">
                        <h5 id="name${response.data[i].id}">${response.data[i].firstName} ${response.data[i].lastName}<span id="job${i}" class="unread">${response.data[i].jobTitle}</span></h5>
                     
                    </div>
                <div>
                    <p id="location${response.data[i].id}">${response.data[i].location}</p>
                    <p id="department${response.data[i].id}">${response.data[i].department}</p>
                    <p id="email${response.data[i].id}">${response.data[i].email}</p>
                </div>
            
            
                </div>
            </a>
           </label> </li>`);
           
            }


        //Sorting
        //Sorting by name
      $('#sortByName').click( function() {
        $('#list').empty();
        sortedList = Object(response.data).sort(function(a,b){  
            var aa = a.firstName;
            var    bb = b.firstName;
              if (aa > bb)
                return 1;
              else if (aa < bb)
                return -1;
              else return 0;}) 
              for(var i=0; i<sortedList.length; i++){
                checkButton =true;
                $("#list").append(`	<li   id="${response.data[i].id}" onclick="showProfile(${response.data[i].id})"> 
            <label for="checkBox${i}">
            <input class="form-check" name="employeeCheckBox" type="checkbox" id="checkBox${i}">                 
            <a >
                <div class="message-avatar">
                    <img src="./images/profileImg.jpg" alt="">
                </div>
                <div class="message-body">
                    <div class="message-body-heading">
                        <h5 id="name${response.data[i].id}">${response.data[i].firstName} ${response.data[i].lastName}<span id="job${i}" class="unread">${response.data[i].jobTitle}</span></h5>
                     
                    </div>
                <div>
                    <p id="location${response.data[i].id}">${response.data[i].location}</p>
                    <p id="department${response.data[i].id}">${response.data[i].department}</p>
                    <p id="email${response.data[i].id}">${response.data[i].email}</p>
                </div>
            
            
                </div>
            </a>
           </label> </li>`);
                }
            
      });
      $( "#list li" ).each(function( index,value ) {
                  
   })
      //Sorting By Location
      $('#sortByLocation').click( function() {
        $('#list').empty()
        var sortedList = Object(response.data).sort(function(a,b){  
            var aa = a.location;
            var    bb = b.location;
              if (aa > bb)
                return 1;
              else if (aa < bb)
                return -1;
              else return 0;})
 

              for(var i=0; i<sortedList.length; i++){
                checkButton =true;
                $("#list").append(`	<li   id="${response.data[i].id}" onclick="showProfile(${response.data[i].id})"> 
                <label for="checkBox${i}">
                <input class="form-check" name="employeeCheckBox" type="checkbox" id="checkBox${i}">                 
                <a >
                    <div class="message-avatar">
                        <img src="./images/profileImg.jpg" alt="">
                    </div>
                    <div class="message-body">
                        <div class="message-body-heading">
                            <h5 id="name${response.data[i].id}">${response.data[i].firstName} ${response.data[i].lastName}<span id="job${i}" class="unread">${response.data[i].jobTitle}</span></h5>
                         
                        </div>
                    <div>
                        <p id="location${response.data[i].id}">${response.data[i].location}</p>
                        <p id="department${response.data[i].id}">${response.data[i].department}</p>
                        <p id="email${response.data[i].id}">${response.data[i].email}</p>
                    </div>
                
                
                    </div>
                </a>
               </label> </li>`);
                }
            
      });
      //Sorting By Department
      $('#sortByDepartment').click( function() {
        $('#list').empty()
        sortedList = Object(response.data).sort(function(a,b){  
            var aa = a.department;
            var    bb = b.department;
              if (aa > bb)
                return 1;
              else if (aa < bb)
                return -1;
              else return 0;})
  

              for(var i=0; i<sortedList.length; i++){
                checkButton =true;
                $("#list").append(`	<li   id="${response.data[i].id}" onclick="showProfile(${response.data[i].id})"> 
                <label for="checkBox${i}">
                <input class="form-check" name="employeeCheckBox" type="checkbox" id="checkBox${i}">                 
                <a >
                    <div class="message-avatar">
                        <img src="./images/profileImg.jpg" alt="">
                    </div>
                    <div class="message-body">
                        <div class="message-body-heading">
                            <h5 id="name${response.data[i].id}">${response.data[i].firstName} ${response.data[i].lastName}<span id="job${i}" class="unread">${response.data[i].jobTitle}</span></h5>
                         
                        </div>
                    <div>
                        <p id="location${response.data[i].id}">${response.data[i].location}</p>
                        <p id="department${response.data[i].id}">${response.data[i].department}</p>
                        <p id="email${response.data[i].id}">${response.data[i].email}</p>
                    </div>
                
                
                    </div>
                </a>
               </label> </li>`);
                }
            
      });

//Employee list on click
      $('#employeeClick, #employeeClick1').click( function(){
        profileVisible = false;
        departmentVisible = false;
        locationVisible = false;
        $("#dropdownMenuButton1").css("display","inline");
        $("#addLocation").css("display","none");
        $("#addButton").css("display","inline");
        $("#addDepartment").css("display","none"); 
        $("#profileCard").css("visibility","hidden");
        $("#cardDepartment").css("visibility","hidden");
        $('#list').empty();
       
        
        for(var i=0; i<response.data.length; i++){
            checkButton =true;
            $("#list").append(`	<li   id="${response.data[i].id}" onclick="showProfile(${response.data[i].id})"> 
            <label for="checkBox${i}">
            <input class="form-check" name="employeeCheckBox" type="checkbox" id="checkBox${i}">                 
            <a >
                <div class="message-avatar">
                    <img src="./images/profileImg.jpg" alt="">
                </div>
                <div class="message-body">
                    <div class="message-body-heading">
                        <h5 id="name${response.data[i].id}">${response.data[i].firstName} ${response.data[i].lastName}<span id="job${i}" class="unread">${response.data[i].jobTitle}</span></h5>
                     
                    </div>
                <div>
                    <p id="location${response.data[i].id}">${response.data[i].location}</p>
                    <p id="department${response.data[i].id}">${response.data[i].department}</p>
                    <p id="email${response.data[i].id}">${response.data[i].email}</p>
                </div>
            
            
                </div>
            </a>
           </label> </li>`);
           
            }
        })

      
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
    }
}); 



//Departments List

$.ajax({
    type: "POST",
    url: './php/getAllDepartments.php',
    data: {
        "type": "check"
    },
    success: function(response) {
        $('#departmentClick,#departmentClick1').click( function(){ 
    
            $("#addLocation").css("display","none");             
            $("#dropdownMenuButton1").css("display","none");
            $("#addDepartment").css("display","inline");
            $("#checkList").css("display","none");
            $("#addButton").css("display","none");
            profileVisible = false;
            departmentVisible = false;
            locationVisible = false;
            $("#profileCard").css("visibility","hidden");
            $("#cardDepartment").css("visibility","hidden");
            $('#list').empty(); 
        for(var i=1; i<response.data.length; i++){ 
            checkButton =true;
            console.log("first",response)
            $("#list").append(`	<li   id="${response.data[i].id}" onclick="showPersonnel(${response.data[i].id})" > 
            <label for="checkBox${i}">
            <input class="form-check" name="employeeCheckBox" type="checkbox" id="checkBox${i} ">                 
            <a >
                <div class="message-avatar">
                    <img src="./images/department.jpg" alt="">
                </div>
                <div class="message-body">
                    <div class="message-body-heading">
                        <h5 id="name${i}">${response.data[i].name}  </h5>
                     
                    </div>
                
            
            
                </div>
            </a>
           </label> </li>`);
           
            }
        })
 
         
            for(var i=1; i<response.data.length; i++){
            $('#departmentList').append($('<option>', {
                value: response.data[i].id,
                text: response.data[i].name
            }));
        }
            
           for(var i=1; i<response.data.length; i++){
            $('#departmentList1').append($('<option>', {
                value: response.data[i].id,
                text: response.data[i].name
            }));
        }
            
      
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
    }
}); 

//Location List
$.ajax({
    type: "POST",
    url: './php/getAllLocation.php',
    data: {
        "type": "check"
    },
    success: function(response) { 
            $('#locationClick,#locationClick1').click( function(){
            $("#dropdownMenuButton1").css("display","none");
            $("#addLocation").css("display","inline");  
            $("#addDepartment").css("display","none");
            $("#checkList").css("display","none");
            $("#addButton").css("display","none");
            $("#profileCard").css("visibility","hidden");
            $("#cardDepartment").css("visibility","hidden");
            $('#list').empty();
        
        for(var i=0; i<response.data.length; i++){
            checkButton =true; 
            $("#list").append(`	<li   id="${i}" onclick="showDepartmentsByLocation(${response.data[i].id})"> 
             
            <label for="checkBox${i}">
            <input class="form-check" name="employeeCheckBox" type="checkbox" id="checkBox${i}">                 
            <a >
                <div class="message-avatar">
                    <img src="./images/location.jpg" alt="">
                </div>
                <div class="message-body">
                    <div class="message-body-heading">
                        <h5 id="name${i}">${response.data[i].name}   </h5>
                     
                    </div>
                
            
            
                </div>
            </a>
           </label> </li>`);
           
            }

 
        })

    
        

            for(var i=1; i<response.data.length; i++){
                $('#locationList1').append($('<option>', {
                    value: response.data[i].id,
                    text: response.data[i].name
                }));
            }
            
          


      $("#addDepartment").click(function(){
        

        for(var i=1; i<response.data.length; i++){
            $('#locationList').append($('<option>', {
                value: response.data[i].id,
                text: response.data[i].name
            }));
        }
        
      })
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
    }
}); 





        var departmentIdCard;   
        var previousId=-1;
        
        //Showing profile - main card for employee
        function showProfile(id){  
            $("#editEmployee").val(id);
           
            if(profileVisible==true&&previousId==id){ 
                $("#profileCard").css("visibility","hidden");
                
                profileVisible=false;
            }
            else {
                $.ajax({
                    type: "POST",
                    url: './php/getPersonnelById.php',
                    data: {
                        "id": id
                    },
                    success: function(response) {
                   
                   
                        previousId=id;
                        $("#removeEmployeeP").text("")
                        $("#removeEmployeeP").append(`Do you want to remove ${response.data[0].firstName}?`)
                        $("#name").text(response.data[0].firstName)
                        $("#lastname").text(response.data[0].lastName )
                        $("#location").text(response.data[0].location)                        
                        $("#department").text(response.data[0].department)                 
                        $("#department").val(response.data[0].id)
                        $("#email").text(response.data[0].email)
                        $("#profileCard").css("visibility","visible");
                        $("#removeEmployeeButton").val(id);
                        $("#job").text(response.data[0].jobTitle)
                        profileVisible=true;

                      
                    
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log(textStatus, errorThrown);
                    }
                }); 

             
            } 
        }
        //Close profile card on close button click
        $("#closeProfileCard").click(function(){
            $("#profileCard").css("visibility","hidden");
            profileVisible=false;
        })
        
        //Close department card on close button click
        $("#closeDepartmentCard").click(function(){
            $("#cardDepartment").css("visibility","hidden");
            departmentVisible=false;
        })
        
        var previousDepartmentId=-1;
        function showPersonnel(id){   
            console.log("thisid",id)
            $("#submitEditDepartment").val(id);
            if(departmentVisible==true&&previousDepartmentId==id){ 
                $("#cardDepartment").css("visibility","hidden");
                departmentVisible=false;
            }
            else {
                previousDepartmentId=id;
                $("#cardDepartment").css("visibility","visible");
                showEmployeesByDepartment(id)
                departmentVisible=true;
            } 
        }

        //Close location card on close button click
        $("#closeLocationCard").click(function(){
            $("#cardLocation").css("visibility","hidden");
            locationVisible=false;
        })
        
        var previousLocationId=-1;
        function showDepartmentsByLocation(id){  
              $("#submitEditLocation").val(id);
              
            $("#LocationNameCard").text($("#"+id).text());
            if(locationVisible==true&&previousLocationId==id){ 
                $("#cardLocation").css("visibility","hidden");
                locationVisible=false;
            }
            else {
                previousLocationId=id;
                $("#cardLocation").css("visibility","visible");
                showEmployeesByLocation(id)
                locationVisible=true;
            } 
        }
 

      

//EMPLOYEES BY DEPARTMENT

        function showEmployeesByDepartment(id){
            console.log("newid",id)
            $.ajax({
                type: "POST",
                url: './php/getPersonnel.php',
                data: {
                    "id": id
                },
                success: function(response) { 
                    $('#list1').empty();
                    $('#removeDepartmentButton').val(response.data.department[0].id)
                    console.log(response)
                    for(var i=0; i<response.data.personnel.length; i++){
                        console.log(response)
                        checkButton =true;
                        $('#departmentNameCard').text(response.data.department[0].name)
                        $("#list1").append(`	<li   id="${i}" onclick="showProfile(${response.data.personnel[i].id})"> 
                         
                        <input class="form-check" name="employeeCheckBox" type="checkbox" id="checkBox${i}">                 
                        <a >
                            <div class="message-avatar">
                                <img src="./images/profileImg.jpg" alt="">
                            </div>
                            <div class="message-body">
                            <button   class="btn btn-danger buttonInForm" data-toggle="modal" data-target="#modalConfirmDelete" type="button"><i class="fa fa-user-times"></i></button>
																				
                                    <h5 id="name${i}">${response.data.personnel[i].firstName} ${response.data.personnel[i].lastName} </h5>
                                    
                                </div>
                            <div> 
                            </div>
                        
                        
                            </div>
                        </a>
                        </li>`);
                       
                        }

          
       
                        
                },
                error: function(jqXHR, textStatus, errorThrown) {
                }
            }); 
         
        }

        // SHOWING DEPARTMENTS BY LOCATION
        function showEmployeesByLocation(id){
            $("#removeLocationButton").val(id)
            $.ajax({
                type: "POST",
                url: './php/getDepartmentsByLocation.php',
                data: {
                    "id": id
                },
                success: function(response) {
                    $('#list2').empty();  
                    for(var i=0; i<response.data.department.length; i++){
                        checkButton =true;
                        $('#departmentNameCard').text(response.data.department[0].name)
                        
                        $("#list2").append(`	<li   id="${i}" onclick="showPersonnel(${response.data.department[i].id})"> 
                         
                        <input class="form-check" name="employeeCheckBox" type="checkbox" id="checkBox${i}">                 
                        <a >
                            <div class="message-avatar">
                                <img src="./images/department.jpg" alt="">
                            </div>
                            <div class="message-body">
                            <button   class="btn btn-danger buttonInForm" data-toggle="modal" data-target="#modalConfirmDelete" type="button"><i class="fa fa-times"></i></button>
																				
                                    <h5 id="name${i}">${response.data.department[i].name}  </h5>
                                 
                                </div>
                            <div> 
                            </div>
                        
                        
                            </div>
                        </a>
                        </li>`);
                       
                        }

          
       
                        
                },
                error: function(jqXHR, textStatus, errorThrown) {
                }
            }); 
         
        }
     
     
      

       


        // Search Bar
        $('#searchBar').on('keyup',function(){
            var valThis = $(this).val();  

            $( "#list li" ).each(function( index,value ) {
                 
                if($(this).text().toUpperCase().indexOf(valThis.toUpperCase()) > -1 ){
                    $(this).show()
                }
                else
                $(this).hide()

              });
          
            
            

            
           
            
            }); 
               

      
      //Checkbuttons show() & hide
      $('#removeButton').hide();

      //show()
        $('#checkList').on('click',function(){

        if(checkButton){
        $('input[type=checkbox]').prop('checked',false);
        $('#removeButton').show()
        $('#addButton').hide()
        $('.form-check').show()
        
        checkButton =false;
       
       }
       //HIDE
       else{ 
        $('#removeButton').hide()
        $('#addButton').show()
        $('.form-check').hide()
        checkButton =true;
       }
    });
    //CHECK ALL EMPLOYEES

    $('#checkAll').click( function(){

    
    if($('#checkAll').prop('checked')) {
        $('input[type=checkbox]').prop('checked',true);
    } else {
        $('input[type=checkbox]').prop('checked',false);
    }}
    )

    //Remove Employee/Employees
    // TODO
        $('#removeEmployeeButton').click(function () {
          $.ajax({
            type: "POST",
            url: './php/deleteEmployeeById.php',
            data: {
                "id": $('#removeEmployeeButton').val()
            },
            success: function(response) { 
                location.reload(true)
            
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });  
        });
      
   //ADD NEW DEPARTMENT
        $("#submitDepartment").click(function(){
            if (
                $("#departmentName").val() == "" ||       
                $('#locationList :selected').text()=="Location"
              ) {
                alert("Please Fill in the Blanks");
                
              }
              else{
            $.ajax({
                type: "POST",
                url: './php/insertDepartment.php',
                data: {
                    "name": $("#departmentName").val(),
                    "locationID": $('#locationList :selected').val()
                },
                success: function(response) {
                    location.reload(true)
                    
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            }); 
        }
        })

//ADD NEW EMPLOYEE
        $("#submitEmployee").click(function(){
            if (
                $("#employeeName").val() == "" ||
                $("#employeeSurname").val() == "" ||
                $("#employeeJobTitle").val() == "" ||
                $("#employeeEmail").val() == "" ||
                $('#departmentList :selected').text()=="Department"
              ) {
                alert("Please Fill in the Blanks");
                
              }
              else{
            $.ajax({
                type: "POST",
                url: './php/insertEmployee.php',
                data: { 
                    
                    "firstName": $("#employeeName").val(),
                    "lastName": $("#employeeSurname").val(),
                    "jobTitle": $("#employeeJobTitle").val(),
                    "email": $("#employeeEmail").val(),
                    "departmentId": $('#departmentList :selected').val()
                },
                success: function(response) {
                     location.reload(true)
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            }); 
        }   
      })
      $("#addEmployee").click(function(){
          
        $("#addEmployeeP").text("")
        $("#addEmployeeP").append(`Do you want to add ${$("#employeeName").val()} ${$("#employeeSurname").val()}?`)
      })
      //EDIT EMPLOYEE
    
      $("#editEmployeeButton").click(function(){
        var valueId=$("#department").val() 
        $("#editEmployeeName:text").val($("#name").text()); 
        $("#editEmployeeLastName:text").val($("#lastname").text());
        $("#editEmployeeJob:text").val($("#job").text());
        $("#editEmployeeEmail:text").val($("#email").text()); 
        $(`#departmentList1 option[value="${valueId}"]`).attr("selected", "selected");
       /* $('editEmployeeLastName').attr('value', $('#entry').val())
        $("editEmployeeLastName:text").val("Glenn Quagmire"); 
        $("#editEmployeeJob").text() = $("#job").text()
        $("#editEmployeeEmail").text() = $("#email").text()
        $('#departmentList1 :selected').text()= $("#department").text()*/
      })
      
      $("#editEmployee").click(function(){


        if (
            $("#editEmployeeName").val() == "" ||
            $("#editEmployeeLastName").val() == "" ||
            $("#editEmployeeJob").val() == "" ||
            $("#editEmployeeEmail").val() == "" ||
            $('#departmentList1 :selected').text()=="Department"
          ) {
            alert("Please Fill in the Blanks");
            
          }
          else{
        $.ajax({
            type: "POST",
            url: './php/updateEmployee.php',
            data: { 
                "id": $(this).val(),
                "firstName": $("#editEmployeeName").val(),
                "lastName": $("#editEmployeeLastName").val(),
                "jobTitle": $("#editEmployeeJob").val(),
                "email": $("#editEmployeeEmail").val(),
                "departmentID": $('#departmentList1 :selected').val()
            },
            success: function(response) {
                location.reload(true)
               
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        }); 
    }   
  })
    


 // Delete Depatment

 $('#removeDepartmentButton').click(function(){
    
    if($("#list1 li").length==0){
      
        $.ajax({
            type: "POST",
            url: './php/deleteDepartmentById.php',
            data: { 
                "id":$("#removeDepartmentButton").val()
            },
            success: function(response) {
                alert("delition succ");
                location.reload(true)
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        }); 
    }
    else{

        alert("There are still assigned employees to this department. Please remove all the employees from this department, before removing this department")
    }


 })
 // Add Location
 
 $("#addLocationConfirm").click(function(){  
    $.ajax({
        type: "POST",
        url: './php/insertLocation.php',
        data: { 
            "name":$("#locationName").val()
        },
        success: function(response) {
            
            alert("New Location Added");
            location.reload(true)
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    }); 

 })

 //Delete Location

 $("#removeLocationButton").click(function(){
     
   var id= $(this).val() 
   if($("#list2 li").length==0){
    $.ajax({
        type: "POST",
        url: './php/deleteLocation.php',
        data: { 
            "id":id
        },
        success: function(response) {
            location.reload(true)
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    }); 
   }
   else{

    alert("There are still assigned departments to this locations. Please remove them, before removing this location")

   }
 })

 // Edit Department
 $("#submitEditDepartment").click(function(){ 
    var id= $(this).val() 
  if( $("#departmentName1").val() == "" ||
  $('#locationList1 :selected').text()=="Location" )
  {
    alert("please enter the values")
  } 
  
 
 else{
     $.ajax({
        type: "POST",
        url: './php/editDepartment.php',
        data: { 
           "name": $("#departmentName1").val(),
           "locationID": $('#locationList1 :selected').val(),
           "id": id
        },
        success: function(response) {
           location.reload(true)
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    }); 
 }
     
  })
 

  // Edit location
 $("#submitEditLocation").click(function(){
     
    var id= $(this).val() 
    if(
        $("#LocationName1").val() == ""){
        alert("Please enter the name")
  }
    else{
    
     $.ajax({
         type: "POST",
         url: './php/editLocation.php',
         data: { 
            "name": $("#LocationName1").val(),
            "id": id
         },
         success: function(response) {
            location.reload(true)
         },
         error: function(jqXHR, textStatus, errorThrown) {
             console.log(textStatus, errorThrown);
         }
     });  
         
    }
     
  })
 