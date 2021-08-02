package com.thoughtworks.fusheng.repository;

import com.google.common.base.Charsets;
import com.google.common.io.CharStreams;
import com.thoughtworks.fusheng.exception.FilesReadingFailedException;
import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

@RequiredArgsConstructor
public class IndexRepository {

    public String retrieveIndexHtml() {
        try {
            InputStream inputStream = getClass().getClassLoader().getResourceAsStream("fusheng-combined.html");
            InputStreamReader inputStreamReader = new InputStreamReader(inputStream, Charsets.UTF_8);
            return CharStreams.toString(inputStreamReader);
        } catch (IOException exp) {
            throw new FilesReadingFailedException("File not found");
        }
    }

}
