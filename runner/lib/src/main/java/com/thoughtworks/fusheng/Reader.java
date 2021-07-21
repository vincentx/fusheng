package com.thoughtworks.fusheng;

import com.google.common.io.CharStreams;
import com.thoughtworks.fusheng.exception.ReaderException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.NoSuchFileException;
import java.util.Optional;

public class Reader {

    public static String read(String path) {
        try {
            InputStreamReader inputStreamReader = Optional
                .ofNullable(Reader.class.getClassLoader().getResourceAsStream(path))
                .map(InputStreamReader::new)
                .orElseThrow(() -> new ReaderException("No such file: " + path));
            return CharStreams.toString(inputStreamReader);

        } catch (NoSuchFileException e) {
            throw new ReaderException("No such file: " + path, e);
        } catch (IOException e) {
            throw new ReaderException("Failed to read: " + path, e);
        }
    }

    public static String getSpecFilePath(String fixtureFileName) {
        return "fusheng/spec/" + fixtureFileName + ".html";
    }

    public static String getSpecByFixture(String fixtureFileName) {
        return read(getSpecFilePath(fixtureFileName));
    }
}
