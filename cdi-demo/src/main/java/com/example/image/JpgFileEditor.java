package com.example.image;

import jakarta.enterprise.inject.Alternative;

@Alternative
public class JpgFileEditor implements ImageFileEditor {
    @Override
    public String openFile(String fileName) {
        return "Opening JPG file " + fileName;
    }
}