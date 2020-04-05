$(function () {

    $('.dateInput').datepicker({
        dateFormat:"dd.mm.yy",
    });

    $('#showAddTaskFormBtn').click(function() {
        $("#todoForm form").trigger('reset');
        $('#todoForm').css('display', 'flex');
    });

    $('#taskForm').click(function(event){
        if(event.target === this) {
            $(this).css('display', 'none');
        }
    });

    $('#editForm').click(function(event){
        if(event.target === this) {
            $(this).css('display', 'none');
        }
    });

    var globTaskId;

    //Open form with task information
    $(document).on("click", ".taskLink", function() {
        var link = $(this);
        var taskId = $(this).data('id');
        $("#editForm").css("display", "flex");
        $.ajax({
            url: "/task/",
            method: "GET",
            success: function(response) {
                globTaskId = taskId;
                $("#editTaskName").val(response.name);
                $("#editStartDate").val(response.dateStart);
                $("#editEndDate").val(response.dateEnd);
                $("#editTaskDescription").val(response.description);
            },
            error: function(response) {
                if (response.status === 404) {
                    alert("Задание не найдено.");
                }
            }
        });
    });

    // //Saving task
    // $("#saveTaskBtn").click(function() {
    //     var formData = {
    //         "name": $("#editTaskName").val(),
    //         "dateStart": $("#editStartDate").val(),
    //         "dateEnd": $("#editEndDate").val(),
    //         "description": $("#editTaskDescription").val()
    //     };
    //     $.ajax({
    //         url: "/task/",
    //         method: 'PUT',
    //         contentType: "application/json; charset=utf-8",
    //         dataType: "json",
    //         data: JSON.stringify(formData),
    //         success: function(response) {
    //             getAllToDo();
    //             $('#editForm').css('display', 'none');
    //         },
    //         error: function(response) {
    //             if (response.status === 404) {
    //                 alert('Задание не найдено.');
    //             }
    //         }
    //     });
    // });

    // //Deleting task
    // $("#deleteTodoBtn").click(function() {
    //     $.ajax({
    //         url: baseUrl + globToDoId,
    //         method: "DELETE",
    //         success: function() {
    //             getAllToDo();
    //             $("#editForm").css("display", "none");
    //         },
    //         error: function (error) {
    //             console.log(error);
    //         }
    //     });
    // });

    //Adding task
    $("#addNewTaskBtn").click(function() {
        var formData = {
            "name" : $("#newTaskName").val(),
            "dateStart" : $("#startDatePicker").val(),
            "dateEnd" : $("#finishDatePicker").val(),
            "description" : $("#newTaskDescription").val()
        };
        $.ajax({
            url: "/tasks",
            method: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(formData, null, '\t'),
            success: function() {
                getAllToDo();
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});