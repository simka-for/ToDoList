package com.example.todolist.controller;

import com.example.todolist.domain.Task;
import com.example.todolist.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TaskController {

    @Autowired
    TaskRepository taskRepository;

    @PostMapping
    @RequestMapping("/task/")
    public Long add(Task task){

        Task newTask = taskRepository.save(task);
        return newTask.getId();
    }



}
