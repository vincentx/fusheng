package com.example.image;

import jakarta.inject.Named;

@Named("gif")
public class GifFileEditor implements ImageFileEditor {
    @Override
    public String openFile(String fileName) {
        return "Opening GIF file " + fileName;
    }
}
