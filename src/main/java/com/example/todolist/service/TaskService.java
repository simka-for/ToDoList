package com.example.todolist.service;

import com.example.todolist.domain.Task;

import java.util.List;

public interface TaskService {

    void addTask(Task task);

    List<Task> list();

    Task getInfo(Task task);

    Task update(Task taskFromDB, Task task);

    void delete(Task task);
}
