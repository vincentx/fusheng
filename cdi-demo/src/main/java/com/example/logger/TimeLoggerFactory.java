package com.example.logger;

import jakarta.enterprise.inject.Produces;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class TimeLoggerFactory {
    @Produces
    public TimeLogger getTimeLogger() {
        return new TimeLogger(new SimpleDateFormat("HH:mm"), Calendar.getInstance());
    }
}
