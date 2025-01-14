package com.timesheet.timesheet.timesheetForm;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/timesheets")
public class TimesheetController {

    @Autowired
    private TimesheetService service;

    public TimesheetController(TimesheetService service) {
        this.service = service;
    }

    @GetMapping
    public List<Timesheet> getAllTimesheets() {
        return service.findAll();
    }

    @PostMapping
    public Timesheet createTimesheet(@RequestBody Timesheet timesheet) {
        return service.save(timesheet);
    }

    @PutMapping("/{id}")
    public Timesheet updateTimesheet(@PathVariable Long id, @RequestBody Timesheet timesheet) {
        timesheet.setId(id);
        return service.save(timesheet);
    }

    @DeleteMapping("/{id}")
    public void deleteTimesheet(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/{id}")
    public Optional<Timesheet> getTimesheetById(@PathVariable Long id) {
        return service.findById(id);
    }

}