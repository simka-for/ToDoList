$(function () {

    const appendTask = function(data){
        var taskCode = '<h4>' + data.name + '</h4>' +
            'Описание:' + data.description + 'дата выполнения' + data.dateEnd;
        $('#task-list')
            .append('<div>' + taskCode + '</div>');
    };

    $('.dateInput').datepicker({
        dateFormat:"dd.mm.yy",
    });

    $('#showAddTaskFormBtn').click(function() {
        $("#taskForm form").trigger('reset');
        $('#taskForm').css('display', 'flex');
    });

    $('#taskForm').click(function(event){
        if(event.target === this) {
            $(this).css('display', 'none');
        }
    });

    var globTaskId;

    $(document).on("click", ".task-link", function() {
        var link = $(this);
        var taskId = $(this).data('id');
        $("#editForm").css("display", "flex");
        $.ajax({
            url: "/task/" + taskId,
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

    //Adding task

    $("#addNewTaskBtn").click(function() {
        var formData = {
            "name" : $("#newTaskName").val(),
            "dateStart" : $("#startDatePicker").val(),
            "dateEnd" : $("#finishDatePicker").val(),
            "description" : $("#newTaskDescription").val()
        };
        $.ajax({
            url: "/task/",
            method: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(formData, null, '\t'),
            success: function() {
                appendTask();
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    // Edit task

    $("#saveTaskBtn").click(function() {
        var formData = {
            "name": $("#editTaskName").val(),
            "dateStart": $("#editStartDate").val(),
            "dateEnd": $("#editEndDate").val(),
            "description": $("#editTaskDescription").val()
        };
        $.ajax({
            url: "/task/" + globTaskId,
            method: 'PUT',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(formData),
            success: function(response) {
                getAllToDo();
                $('#editForm').css('display', 'none');
            },
            error: function(response) {
                if (response.status === 404) {
                    alert('Задание не найдено.');
                }
            }
        });
    });

    //Deleting task
    $("#deleteTaskBtn").click(function() {
        $.ajax({
            url: "/task/" + globTaskId,
            method: "DELETE",
            success: function() {
                getAllToDo();
                $("#editForm").css("display", "none");
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

});
