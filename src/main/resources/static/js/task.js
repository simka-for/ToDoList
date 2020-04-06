$(function () {

    getAllTask();

    function getAllTask() {
        $.ajax({
            url: "/task/",
            method: "GET",
            dataType: "json",
            success: function(data) {
                var tableBody = $("#task-table");
                tableBody.empty();
                $(data).each(function(index, element) {
                    tableBody.append(
                        '<tr>' +
                        '<td>' +
                        '<a href="#" class="task-link" data-active=true data-id="' + element.id + '">' + element.name + '</a>' +
                        '</td>' +
                        '<td class="taskDate">' + element.dateStart + '</td>' +
                        '<td class="taskDate">' + element.dateEnd + '</td>' +
                        '<td>' + element.description + '</td>' +
                        '</tr>'
                    );
                })
            }
        });
    }

    $('.dateInput').datepicker({
        dateFormat:"dd.mm.yy",
        altField: "#actualDate",
        minDate: new Date(2020, 1 - 1, 1)
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
                getAllTask();
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
                getAllTask();
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
                getAllTask();
                $("#editForm").css("display", "none");
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

});
