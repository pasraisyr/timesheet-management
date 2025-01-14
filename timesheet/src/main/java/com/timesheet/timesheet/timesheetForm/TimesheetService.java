package com.timesheet.timesheet.timesheetForm;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class TimesheetService {

    @Autowired
    private TimesheetRepository repository;

    public TimesheetService(TimesheetRepository repository) {
        this.repository = repository;
    }

    public List<Timesheet> findAll() {
        return repository.findAll();
    }

    public Timesheet save(Timesheet timesheet) {
        return repository.save(timesheet);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Optional<Timesheet> findById(Long id) {
        return repository.findById(id);
    }
   
   
}