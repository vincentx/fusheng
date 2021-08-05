package com.example.image;

import com.example.logger.TimeLogger;
import jakarta.inject.Inject;
import jakarta.inject.Named;

public class ImageFileProcessor {
    private ImageFileEditor imageFileEditor;
    private TimeLogger timeLogger;

    @Inject
    @Named("gif")
    public ImageFileProcessor(@PngQualifier ImageFileEditor imageFileEditor, TimeLogger timeLogger) {
        this.imageFileEditor = imageFileEditor;
        this.timeLogger = timeLogger;
    }

    public String openFile(String fileName) {
        return imageFileEditor.openFile(fileName) + " at " + timeLogger.getTime();
    }
}
