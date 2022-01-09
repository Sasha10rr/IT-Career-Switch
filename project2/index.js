// Creating List From DataBase
var profileVisible = false;
var departmentVisible = false;
var locationVisible = false;
var email;
var employeeList;
var checkButton = true;
$("#editEmployeeButton").css("display", "none");
$("#editSwitch").css("display", "none");
$("#textSwitch").css("display", "none");
$("#deleteEmployeeButton").css("display", "none");
$("#dropdownMenuButton1").css("display", "inline");
$("#addLocation").css("display", "none");
$("#Button").css("display", "inline");
$("#profileCard").css("display", "none");
$("#cardLocation").css("display", "none");
$("#cardDepartment  ").css("display", "none");
$("#removeEmployeeButton1").click(function() {

})

$.ajax({
    type: "POST",
    url: './php/getAll.php',
    data: {
        "type": "check"
    },
    success: function(response) {
        $("#addDepartment").css("display", "none");
       showEmployees();

        //Sorting
        //Sorting by name
        $('#sortByName').click(function() {
            $('#list').empty();
            sortedList = Object(response.data).sort(function(a, b) {
                var aa = a.firstName;
                var bb = b.firstName;
                if (aa > bb)
                    return 1;
                else if (aa < bb)
                    return -1;
                else return 0;
            })
            for (var i = 0; i < sortedList.length; i++) {
                checkButton = true;
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

       
        //Sorting By Location
        $('#sortByLocation').click(function() {
            $('#list').empty()
            var sortedList = Object(response.data).sort(function(a, b) {
                var aa = a.location;
                var bb = b.location;
                if (aa > bb)
                    return 1;
                else if (aa < bb)
                    return -1;
                else return 0;
            })


            for (var i = 0; i < sortedList.length; i++) {
                checkButton = true;
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
        $('#sortByDepartment').click(function() {
            $('#list').empty()
            sortedList = Object(response.data).sort(function(a, b) {
                var aa = a.department;
                var bb = b.department;
                if (aa > bb)
                    return 1;
                else if (aa < bb)
                    return -1;
                else return 0;
            })
            for (var i = 0; i < sortedList.length; i++) {
                checkButton = true;
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
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
    }
});




  //Employee list on click
  $('#employeeClick, #employeeClick1').click(function() {
    showEmployees();
})

function showEmployees(){
    $("#profileCard").css("display", "none");
    $("#cardLocation").css("display", "none");
    profileVisible = false;
    $("#editEmployeeButton").css("display", "none");
    $("#editSwitch").css("display", "none");
    $("#textSwitch").css("display", "none");
    $("#deleteEmployeeButton").css("display", "none");
    $("#addEmployeeButton").css("display", "block");
    $("#titleAddEmployee").css("display", "block");
    $("#titleEditEmployee").css("display", "none");
    $("#employeeProfile :input").prop("disabled", false);
    $('#employeeProfile')[0].reset();
    $("#dropdownMenuButton1").css("display", "inline");
    $("#addLocation").css("display", "none");
    $("#addButton").css("display", "inline");
    $("#addDepartment").css("display", "none");
    $("#cardDepartment").css("visibility", "hidden");
    $('#list').empty();
    $.ajax({
        type: "POST",
        url: './php/getAll.php',
        data: {
            "type": "check"
        },
        success: function(response) {
    
            sortedList = Object(response.data).sort(function(a, b) {
                var aa = a.id;
                var bb = b.id;
                return bb - aa
            })
            for (var i = 0; i < sortedList.length; i++) {
                checkButton = true;
                $("#list").append(`	<li   id="${response.data[i].id}" class="respon" onclick="showProfile(${response.data[i].id})"> 
                <label for="checkBox${i}">       
                <a >
                    <div class="message-avatar" >
                        <img src="./images/profileImg.jpg" alt="">
                    </div>
                    <div class="message-body" >
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
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}







$('#departmentClick,#departmentClick1').click(function() {
    showDepartments();
})

//Departments List
function showDepartments () {
    $("#departmentProfile :input").prop("disabled", false);
            $("#messageDeleteDepartment").css("display", "none");
            $("#employeeListInDepartment").css("display", "none");
            $("#cardLocation").css("display", "none");
            $("#profileCard").css("display", "none");
            $("#cardDepartment").css("display", "none");
            $("#cardDepartment").css("visibility", "visible");
            $("#editDepartmentButton").css("display", "none");
            $("#titleEditDepartment").css("display", "none");
            $("#titleAddDepartment").css("display", "block");
            $("#editSwitch1").css("display", "none");
            $("#deleteDepartmentButton").css("display", "none");
            $("#addDepartmentButton").css("display", "block");
            $('#departmentProfile')[0].reset();
            departmentVisible = false;
            $("#addLocation").css("display", "none");
            $("#dropdownMenuButton1").css("display", "none");
            $("#addDepartment").css("display", "inline");
            $("#checkList").css("display", "none");
            $("#addButton").css("display", "none");
            profileVisible = false;
            departmentVisible = false;
            locationVisible = false;
            $("#profileCard").css("visibility", "hidden");
            $("#addEmployeeButton").css("display", "none");
            $.ajax({
                type: "POST",
                url: './php/getAllDepartments.php',
                data: {
                    "type": "check"
                },
                success: function(response) {
                    $('#list').empty();

                    sortedList = Object(response.data).sort(function(a, b) {
                        var aa = a.id;
                        var bb = b.id;
                        return bb - aa
                    })
            for (var i = 0; i < response.data.length; i++) {
                checkButton = true;
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
                    sortedList = Object(response.data).sort(function(a, b) {
                        var aa = a.id;
                        var bb = b.id;
                        return bb - aa
                    })
                    for (var i = 0; i < sortedList.length; i++) {
                        $('#departmentList').append($('<option>', {
                            value: response.data[i].id,
                            text: response.data[i].name
                        }));
                    }
                  
                   
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });           
}

//Department List For Adding Employee
$.ajax({
    type: "POST",
    url: './php/getAllDepartments.php',
    data: {
        "type": "check"
    },
    success: function(response) {
       
        sortedList = Object(response.data).sort(function(a, b) {
            var aa = a.id;
            var bb = b.id;
            return bb - aa
        })
        for (var i = 0; i < sortedList.length; i++) {
            $('#departmentList').append($('<option>', {
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
       
        sortedList = Object(response.data).sort(function(a, b) {
            var aa = a.id;
            var bb = b.id;
            return aa - bb
        })

        for (var i = 0; i < sortedList.length; i++) {
            $('#locationListEdit').append($('<option>', {
                value: response.data[i].id,
                text: response.data[i].name
            }));
        }
        $("#addDepartment").click(function() {
            $("#departmentProfile :input").prop("disabled", false);
            $("#messageDeleteDepartment").css("display", "none");
            $("#employeeListInDepartment").css("display", "none");
            $("#cardLocation").css("display", "none");
            $("#profileCard").css("display", "none");
            $("#cardDepartment").css("display", "block");
            $("#cardDepartment").css("visibility", "visible");
            $("#editDepartmentButton").css("display", "none");
            $("#titleEditDepartment").css("display", "none");
            $("#titleAddDepartment").css("display", "block");
            $("#editSwitch1").css("display", "none");
            $("#deleteDepartmentButton").css("display", "none");
            $("#addDepartmentButton").css("display", "block");
            $('#departmentProfile')[0].reset();
            departmentVisible = false;
            for (var i = 1; i < response.data.length; i++) {
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



$('#locationClick,#locationClick1').click(function() {
    showLocations()
})
function showLocations(){
            $("#locationProfile :input").prop("disabled", false);
            $("#messageDeleteLocation").css("display", "none");
            $("#employeeListInLocation").css("display", "none");
            $("#profileCard").css("display", "none");
            $("#cardDepartment").css("display", "none");
            $("#cardLocation").css("display", "none"); 
            $("#editLocationButton").css("display", "none");
            $("#titleEditLocation").css("display", "none");
            $("#titleAddLocation").css("display", "block");
            $("#editSwitch2").css("display", "none");
            $("#deleteLocationButton").css("display", "none");
            $("#addLocationButton").css("display", "block");
            $('#locationProfile')[0].reset();
            locationVisible = false;
            $("#dropdownMenuButton1").css("display", "none");
            $("#addLocation").css("display", "inline");
            $("#addDepartment").css("display", "none");
            $("#checkList").css("display", "none");
            $("#addButton").css("display", "none");
            $("#profileCard").css("visibility", "hidden");
            $("#addEmployeeButton").css("display", "none");
            $("#cardDepartment").css("visibility", "hidden");
            $('#list').empty();
            $.ajax({
                type: "POST",
                url: './php/getAllLocation.php',
                data: {
                    "type": "check"
                },
                success: function(response) {
                    sortedList = Object(response.data).sort(function(a, b) {
                        var aa = a.id;
                        var bb = b.id;
                        return bb - aa
                    })
                    for (var i = 0; i < response.data.length; i++) {
                        checkButton = true;
                        $("#list").append(`	<li   id="${response.data[i].id}" onclick="showDepartmentsByLocation(${response.data[i].id})"> 
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
                    
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });


           
}















var departmentIdCard;
var previousId = -1;
//Showing profile - main card for employee
function showProfile(id) {
    $('#editSwitch').prop('checked', false);
    $("#editEmployeeButton").css("display", "block");
    $("#titleEditEmployee").css("display", "block");
    $("#titleAddEmployee").css("display", "none");
    $("#editSwitch").css("display", "block");
    $("#textSwitch").css("display", "block");
    $("#deleteEmployeeButton").css("display", "block");
    $("#profileCard").css("display", "inline");
    $("#addEmployeeButton").css("display", "none");
    $("#cardDepartment").css("display", "none");
    $("#cardLocation").css("display", "none");
    isEditOn = false;
    $("#employeeProfile :input").prop("disabled", true);
    $("#editEmployee").val(id);
    if (profileVisible == true && previousId == id) {
        $("#profileCard").css("visibility", "hidden");
        $("#addEmployeeButton").css("display", "none");
        profileVisible = false;
    } else {
        $.ajax({
            type: "POST",
            url: './php/getPersonnelById.php',
            data: {
                "id": id
            },
            success: function(response) {
                var depid = response.data[0].id;
                previousId = id;
                $("#removeEmployeeP").text("")
                $("#removeEmployeeP").append(`Do you want to remove <b>${response.data[0].firstName} ${response.data[0].lastName}?</b>`)
                $("#firstName").val(response.data[0].firstName)
                $("#lastName").val(response.data[0].lastName)
                $("#location").text(response.data[0].location)
                $(`#departmentList option[value=${depid}]`).prop('selected', true)
                $("#emailAddress").val(response.data[0].email)
                $("#profileCard").css("visibility", "visible");
                $("#addEmployeeButton").css("display", "none");
                $("#removeEmployeeButton").val(id);
                $("#job").val(response.data[0].jobTitle)
                profileVisible = true;
                $("#editEmployeeButton").click(function() {
                    
                    $("#editEmployeeText").text("")
                   
                    $("#editEmployeeText").append(`Do you want to change <b>${response.data[0].firstName}</b> to <b>${$("#firstName").val()}</b>, <b>${response.data[0].lastName}</b> to <b>${$("#lastName").val()}</b>, <b>${response.data[0].jobTitle}</b> to <b>${$("#job").val()}</b>, <b>${response.data[0].email}</b> to <b>${$("#emailAddress").val()}</b> and <b>${response.data[0].department}</b> to <b>${$(`#departmentList`).find(":selected").text()}</b>?`)
                })
               
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    }
}
//Close profile card on close button click
$("#closeProfileCard").click(function() {
    $("#profileCard").css("visibility", "hidden");
    profileVisible = false;
})
//Close department card on close button click
$("#closeDepartmentCard").click(function() {
    $("#cardDepartment").css("visibility", "hidden");
    departmentVisible = false;
})
departmentVisible = false;
var previousDepartmentId = -1;
function showPersonnel(id) {
    isEditOnDepartment = false;
    $('#editSwitch1').prop('checked', false);
    $("#messageDeleteDepartment").css("display", "block");
    $("#employeeListInDepartment").css("display", "block");
    $("#editDepartmentButton").css("display", "block");
    $("#titleEditDepartment").css("display", "block");
    $("#titleAddDepartment").css("display", "none");
    $("#editSwitch1").css("display", "block");
    $("#deleteDepartmentButton").css("display", "block");
    $("#addDepartmentButton").css("display", "none");
    $("#cardDepartment").css("display", "block");
    $("#cardDepartment").css("visibility", "visible");
    $("#departmentProfile :input").prop("disabled", true);
    $("#submitEditDepartment").val(id);
    if (departmentVisible == true && previousDepartmentId == id) {
        $("#cardDepartment").css("visibility", "hidden");
    } else {
        $.ajax({
            type: "POST",
            url: './php/employeesInDepartment.php',
            data: {
                "id": id
            },
            success: function(response) {
                if (response.data[0].pc > 0) {
                    $("#deleteDepartmentButton").attr('disabled', true);
                } else {
                    $("#deleteDepartmentButton").attr('disabled', false);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
        previousDepartmentId = id;
        $("#cardDepartment").css("visibility", "visible");
        showEmployeesByDepartment(id)
        departmentVisible = true;
    }
}

//Close location card on close button click
$("#closeLocationCard").click(function() {
    $("#cardLocation").css("visibility", "hidden");
    locationVisible = false;
})
$("#deleteLocationButton").click(function() {
    $("#locationDeleteMessage").text("")
    $("#locationDeleteMessage").append(`Do you want to remove <b>${$(locationName).val()}?</b>`)
})
var previousLocationId = -1;

function showDepartmentsByLocation(id) {
    $('#editSwitch2').prop('checked', false);
    $("#messageDeleteLocation").css("display", "block");
    $("#employeeListInLocation").css("display", "block");
    $("#profileCard").css("display", "none");
    $("#cardDepartment").css("display", "none");
    $("#cardLocation").css("display", "block");
    $("#cardLocation").css("visibility", "visible");
    $("#editLocationButton").css("display", "block");
    $("#titleEditLocation").css("display", "block");
    $("#titleAddLocation").css("display", "none");
    $("#editSwitch2").css("display", "block");
    $("#deleteLocationButton").css("display", "block");
    $("#addLocationButton").css("display", "none");
    isEditOnLocation = false;
    departmentVisible = false;
    $.ajax({
        type: "POST",
        url: './php/departmentsInLocation.php',
        data: {
            "id": id
        },
        success: function(response) {
            console.log(response)
            if (response.data[0].dp > 0) {

                $("#deleteLocationButton").attr('disabled', true);
            } else {
                $("#deleteLocationButton").attr('disabled', false);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
    $("#submitEditLocation").val(id);
    $("#locationName").val($("#" + id + " h5").text());
    if (locationVisible == true && previousLocationId == id) {
        $("#cardLocation").css("visibility", "hidden");
        locationVisible = false;
    } else {
        previousLocationId = id;
        $("#profileCard").css("display", "none");
        $("#addEmployeeButton").css("display", "none");
        $("#cardDepartment").css("display", "none");
        $("#cardLocation").css("visibility", "visible");
        showEmployeesByLocation(id)
        locationVisible = true;
    }
}

//EMPLOYEES BY DEPARTMENT
function showEmployeesByDepartment(id) {
    $("#profileCard").css("display", "none");
    $("#addEmployeeButton").css("display", "none");
    $("#cardLocation").css("display", "none");
    $("#cardDepartment").css("display", "block");
    $("#addEmployee").css("display", "none");
    $.ajax({
        type: "POST",
        url: './php/getPersonnel.php',
        data: {
            "id": id
        },
        success: function(response) {
            $("#editDepartmentButton").click(function() {
                $("#messageDepartment").text("")
                $("#messageDepartment").append("Do you want to change <b>" + response.data.department[0].name + "</b> to <b>" + $('#departmentName').val() + "</b> and assign location to <b>" + $(`#locationListEdit`).find(":selected").text() + "</b>")
            })
            $("#deleteDepartmentButton").click(function() {
                $("#removeDepartmentMessage").text("")
                $("#removeDepartmentMessage").append("Do you want to remove <b>" + response.data.department[0].name + "</b>")
            })
            $('#list1').empty();
            $('#removeDepartmentButton').val(response.data.department[0].id)
            var locationEditId = response.data.department[0].locationID;
            $('#departmentName').val(response.data.department[0].name)
            $(`#locationListEdit option[value=${locationEditId}]`).prop('selected', true)
            for (var i = 0; i < response.data.personnel.length; i++) {
                checkButton = true;
                //tuka department info
                $("#list1").append(`	<li   id="${i}" > 
                        <a >
                            <div class="message-avatar">
                                <img src="./images/profileImg.jpg" alt="">
                            </div>
                            <div class="message-body">
                            <button   class="btn btn-success  "onclick="showProfile(${response.data.personnel[i].id})" type="button" style="margin-left:4px"><i class="fa fa-eye"></i></button>
                            														
                                    <h5 id="name${i}">${response.data.personnel[i].firstName} ${response.data.personnel[i].lastName} </h5>
                                    
                                </div>
                            <div> 
                            </div>
                            </div>
                        </a>
                        </li>`);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {}
    });
}
$("#addLocationButton").click(function() {
    $("#locationAddMessage").text("")
    $("#locationAddMessage").append(`Do you want to add <b>${$(locationName).val()} to Locations?</b>`)
})

// SHOWING DEPARTMENTS BY LOCATION
function showEmployeesByLocation(id) {
    console.log('eveme')
    $("#locationProfile :input").prop("disabled", true);
    $("#profileCard").css("display", "none");
    $("#addEmployeeButton").css("display", "none");
    $("#cardLocation").css("display", "inline");
    $("#cardDepartment").css("display", "none");
    $("#removeLocationButton").val(id)
    $.ajax({
        type: "POST",
        url: './php/getLocationById.php',
        data: {
            "id": id
        },
        success: function(response) {
            console.log("tuka")
            $("#locationName").val(response.data[0].name)

            $("#editLocationButton").click(function() {
                $("#locationEditMessage").text("")
                $("#locationEditMessage").append(`Do you want to change <b>${response.data[0].name}</b> to <b>${$(locationName).val()}?</b>`)
            })
        },
        error: function(jqXHR, textStatus, errorThrown) {}
    });
    $.ajax({
        type: "POST",
        url: './php/getDepartmentsByLocation.php',
        data: {
            "id": id
        },
        success: function(response) {
            $('#list2').empty();
            for (var i = 0; i < response.data.department.length; i++) {
                checkButton = true;
                $('#departmentNameCard').text(response.data.department[0].name)
                $("#list2").append(`	<li   id="${i}" onclick="showPersonnel(${response.data.department[i].id})"> 
                        <input class="form-check" name="employeeCheckBox" type="checkbox" id="checkBox${i}">                 
                        <a >
                            <div class="message-avatar">
                                <img src="./images/department.jpg" alt="">
                            </div>
                            <div class="message-body">											
                                    <h5 id="name${i}">${response.data.department[i].name}  </h5>
                                 
                                </div>
                            <div> 
                            </div>
                            </div>
                        </a>
                        </li>`);

            }
        },
        error: function(jqXHR, textStatus, errorThrown) {}
    });

}

// Search Bar
$('#searchBar').on('keyup', function() {
    var valThis = $(this).val();
    $("#list li").each(function(index, value) {
        if ($(this).text().toUpperCase().indexOf(valThis.toUpperCase()) > -1) {
            $(this).show()
        } else
            $(this).hide()
    });
});
//Checkbuttons show() & hide
$('#removeButton').hide();
//show()
$('#checkList').on('click', function() {
    if (checkButton) {
        $('input[type=checkbox]').prop('checked', false);
        $('#removeButton').show()
        $('#addButton').hide()
        $('.form-check').show()
        checkButton = false;
    }
    //HIDE
    else {
        $('#removeButton').hide()
        $('#addButton').show()
        $('.form-check').hide()
        checkButton = true;
    }
});
//CHECK ALL EMPLOYEES

$('#checkAll').click(function() {
    if ($('#checkAll').prop('checked')) {
        $('input[type=checkbox]').prop('checked', true);
    } else {
        $('input[type=checkbox]').prop('checked', false);
    }
})

//Remove Employee/Employees
// TODO
$('#removeEmployeeButton').click(function() {
    $.ajax({
        type: "POST",
        url: './php/deleteEmployeeById.php',
        data: {
            "id": $('#removeEmployeeButton').val()
        },
        success: function(response) {
            showEmployees();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
});

//ADD NEW DEPARTMENT
$("#submitDepartment").click(function() {
    $.ajax({
        type: "POST",
        url: './php/insertDepartment.php',
        data: {
            "name": $("#departmentName").val(),
            "locationID": $('#locationListEdit :selected').val()
        },
        success: function(response) {
            showDepartments();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });

})

//add Location Form
$("#cardLocation :input").prop("disabled", false);
$("#addLocation").click(function() {
    $("#addLocationButton").attr('disabled', true);
    $("#locationProfile :input").prop("disabled", false);
    $("#messageDeleteLocation").css("display", "none");
    $("#employeeListInLocation").css("display", "none");
    $("#profileCard").css("display", "none");
    $("#cardDepartment").css("display", "none");
    $("#cardLocation").css("display", "block");
    $("#cardLocation").css("visibility", "visible");
    $("#editLocationButton").css("display", "none");
    $("#titleEditLocation").css("display", "none");
    $("#titleAddLocation").css("display", "block");
    $("#editSwitch2").css("display", "none");
    $("#deleteLocationButton").css("display", "none");
    $("#addLocationButton").css("display", "block");
    $('#locationProfile')[0].reset();
    locationVisible = false;
})
$("#addLocationButton").attr('disabled', true);
$("#locationProfile").on('change input', function() {

    if (
        $("#locationName").val() == ""
    ) {
        $("#addLocationButton").attr('disabled', true);
    } else {
        $("#addLocationButton").attr('disabled', false);
    }
})

$("#addDepartmentButton").click(function() {
    $("#addDepartmentMessage").text("")
    $("#addDepartmentMessage").append("Do you want to add <b>" + $("#departmentName").val() + "</b> and assign location <b>" + $("#locationListEdit").find(":selected").text() + "</b>")
})

//add Department form
$("#cardDepartment :input").prop("disabled", false);
$("#addDepartment").click(function() {
    $("#messageDeleteDepartment").css("display", "none");
    $("#employeeListInDepartment").css("display", "none");
    $("#cardLocation").css("display", "none");
    $("#profileCard").css("display", "none");
    $("#cardDepartment").css("display", "block");
    $("#cardDepartment").css("visibility", "visible");
    $("#editDepartmentButton").css("display", "none");
    $("#titleEditDepartment").css("display", "none");
    $("#titleAddDepartment").css("display", "block");
    $("#editSwitch1").css("display", "none");
    $("#deleteDepartmentButton").css("display", "none");
    $("#addDepartmentButton").css("display", "block");
    $('#departmentProfile')[0].reset();
    departmentVisible = false;
})
$("#addDepartmentButton").attr('disabled', true);
$("#departmentProfile").on('change input', function() {
    if (
        $("#departmentName").val() == "" ||
        $('#locationListEdit :selected').text() == "Select Location"
    ) {
        $("#addDepartmentButton").attr('disabled', true);
    } else {
        $("#addDepartmentButton").attr('disabled', false);
    }
})

//ADD NEW EMPLOYEE
$("#addButton").click(function() {
    profileVisible = false
    $("#profileCard").css("display", "block");
    $("#profileCard").css("visibility", "visible");
    $("#editEmployeeButton").css("display", "none");
    $("#editSwitch").css("display", "none");
    $("#textSwitch").css("display", "none");
    $("#deleteEmployeeButton").css("display", "none");
    $("#addEmployeeButton").css("display", "block");
    $("#titleAddEmployee").css("display", "block");
    $("#titleEditEmployee").css("display", "none");
    $("#employeeProfile :input").prop("disabled", false);
    $('#employeeProfile')[0].reset();
    $("#employeeProfile").on('change input', function() {
        if (
            $("#firstName").val() == "" ||
            $("#lastName").val() == "" ||
            $("#job").val() == "" ||
            $("#emailAddress").val() == "" ||
            $('#departmentList :selected').text() == "Department"
        ) {
            $("#addEmployeeButton").attr('disabled', true);
        } else {
            $("#addEmployeeButton").attr('disabled', false);
        }
    })

})

//validation
function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        return false;
    } else {
        return true;
    }
}

$("#addEmployeeButton").attr('disabled', true);
$("#employeeProfile").on('change input', function() {
    if (
        $("#firstName").val() == "" ||
        $("#lastName").val() == "" ||
        $("#job").val() == "" ||
        $("#emailAddress").val() == "" ||
        IsEmail($("#emailAddress").val()) == false ||
        $('#departmentList :selected').text() == "Department"
    ) {
        $("#addEmployeeButton").attr('disabled', true);
    } else {
        $("#addEmployeeButton").attr('disabled', false);
    }
})

$("#addEmployeeButton").click(function() {
    $("#addEmployeeP").text("")
    $("#addEmployeeP").append(`Do you want to add <b>${$("#firstName").val()} ${$("#lastName").val()}?</b>`)
})

$("#submitEmployee").click(function() {
    $.ajax({
        type: "POST",
        url: './php/insertEmployee.php',
        data: {
            "firstName": $("#firstName").val(),
            "lastName": $("#lastName").val(),
            "jobTitle": $("#job").val(),
            "email": $("#emailAddress").val(),
            "departmentId": $('#departmentList :selected').val()
        },
        success: function(response) {
            showEmployees();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });

})

//edit employee
$("#editEmployee").click(function() {
    $.ajax({
        type: "POST",
        url: './php/updateEmployee.php',
        data: {
            "id": $(this).val(),
            "firstName": $("#firstName").val(),
            "lastName": $("#lastName").val(),
            "jobTitle": $("#job").val(),
            "email": $("#emailAddress").val(),
            "departmentID": $('#departmentList :selected').val()
        },
        success: function(response) {
            showEmployees();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
})



// Delete Depatment

$('#removeDepartmentButton').click(function() {
    $.ajax({
        type: "POST",
        url: './php/deleteDepartmentById.php',
        data: {
            "id": $("#removeDepartmentButton").val()
        },
        success: function(response) {
            showDepartments();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
})
// Add Location

$("#addLocationConfirm").click(function() {
    $.ajax({
        type: "POST",
        url: './php/insertLocation.php',
        data: {
            "name": $("#locationName").val()
        },
        success: function(response) {
            showLocations();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
})

//Delete Location

$("#removeLocationButton").click(function() {
    var id = $(this).val()
    $.ajax({
        type: "POST",
        url: './php/deleteLocation.php',
        data: {
            "id": id
        },
        success: function(response) {
            showLocations();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
})

// Edit Department
$("#submitEditDepartment").click(function() {
    var id = $(this).val()
    $.ajax({
        type: "POST",
        url: './php/editDepartment.php',
        data: {
            "name": $("#departmentName").val(),
            "locationID": $('#locationListEdit :selected').val(),
            "id": id
        },
        success: function(response) {
            showDepartments();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
})


// Edit location
$("#submitEditLocation").click(function() {
    var id = $(this).val();
    $.ajax({
        type: "POST",
        url: './php/editLocation.php',
        data: {
            "name": $("#locationName").val(),
            "id": id
        },
        success: function(response) {
            showLocations();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
})

//edit option employee
var isEditOn = false;
$("#editSwitch").click(function() {
    if (isEditOn == false) {
        isEditOn = true;
        $("#employeeProfile :input").prop("disabled", false);
    } else {
        isEditOn = false;
        $("#employeeProfile :input").prop("disabled", true);
    }
})

//edit option department
var isEditOnDepartment = false;
$("#editSwitch1").click(function() {
    if (isEditOnDepartment == false) {
        isEditOnDepartment = true;
        $("#departmentProfile :input").prop("disabled", false);
    } else {
        isEditOnDepartment = false;
        $("#departmentProfile :input").prop("disabled", true);
    }
})

//edit option location
var isEditOnLocation = false;
$("#editSwitch2").click(function() {
    if (isEditOnLocation == false) {
        isEditOnLocation = true;
        $("#locationProfile :input").prop("disabled", false);
    } else {
        isEditOnLocation = false;
        $("#locationProfile :input").prop("disabled", true);
    }
})

//Reloar after succesful
$("#closeRefresh").click(function() { 
})



 