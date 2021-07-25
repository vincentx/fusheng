package com.thoughtworks.fusheng;

import com.thoughtworks.fusheng.exception.SaverException;
import org.jsoup.nodes.Element;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.file.Files;
import java.nio.file.Path;

public class Writer {
  static public void write(Path path, Element element) {
    try {
      Path folder = path.getParent();
      if (!Files.exists(folder)) {
        Files.createDirectories(folder);
      }

      FileOutputStream fos = new FileOutputStream(path.toFile());
      OutputStreamWriter osw = new OutputStreamWriter(fos, "utf-8");
      osw.write(element.html());
      osw.close();
    } catch (IOException e) {
      throw new SaverException(String.format("Save spec failed: %s", path), e);
    }
  }
}
