package com.timesheet.timesheet.status;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatusService {
    @Autowired
    private StatusRepository repository;

    public List<Status> findAll() {
        return repository.findAll();
    }

    public Status save(Status status) {
        return repository.save(status);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Optional<Status> findById(Long id) {
        return repository.findById(id);
    }

}
