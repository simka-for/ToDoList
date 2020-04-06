package com.example.todolist.service;

import com.example.todolist.domain.Task;
import com.example.todolist.repository.TaskRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImp implements TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskServiceImp(TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }

    @Override
    public void addTask(Task task) {

        taskRepository.save(task);
    }

    @Override
    public List<Task> list() {

        return taskRepository.findAll();
    }

    @Override
    public Task getInfo(Task task) {

        return task;
    }

    @Override
    public Task update(Task taskFromDB, Task task) {

        BeanUtils.copyProperties(task, taskFromDB, "id");

        return taskRepository.save(taskFromDB);
    }

    @Override
    public void delete(Task task) {

        taskRepository.delete(task);
    }
}
