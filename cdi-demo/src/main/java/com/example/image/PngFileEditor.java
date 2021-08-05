package com.example.image;

@PngQualifier
public class PngFileEditor implements ImageFileEditor {
    @Override
    public String openFile(String fileName) {
        return "Opening PNG file " + fileName;
    }
}
