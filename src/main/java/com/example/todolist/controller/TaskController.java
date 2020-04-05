package com.example.todolist.controller;

import com.example.todolist.domain.Task;
import com.example.todolist.repository.TaskRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class TaskController {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskController(TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }

    @PostMapping
    @RequestMapping("/task/")
    public Task add(@RequestBody Task task){

        return taskRepository.save(task);
    }

    @GetMapping("/task/{id}")
    public Task getInfo(@PathVariable("id") Task task){

        return task;
    }

    @PutMapping("/task/{id}")
    public Task update(
            @PathVariable("id") Task taskFromDB,
            @RequestBody Task task
    ){
        BeanUtils.copyProperties(task, taskFromDB, "id");

        return taskRepository.save(taskFromDB);
    }

    @DeleteMapping("/task/{id}")
    public void delete(@PathVariable("id") Task task){

        taskRepository.delete(task);
    }



}
