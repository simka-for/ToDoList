package com.example.todolist.controller;

import com.example.todolist.domain.Task;
import com.example.todolist.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("task")
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService){
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> list(){

        return taskService.list();
    }

    @PostMapping
    public void add(@RequestBody Task task){

        taskService.addTask(task);
    }

    @GetMapping("{id}")
    public Task getInfo(@PathVariable("id") Task task){

        return taskService.getInfo(task);
    }

    @PutMapping("{id}")
    public Task update(
            @PathVariable("id") Task taskFromDB,
            @RequestBody Task task
    ){
        return taskService.update(taskFromDB, task);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Task task){

        taskService.delete(task);
    }



}
