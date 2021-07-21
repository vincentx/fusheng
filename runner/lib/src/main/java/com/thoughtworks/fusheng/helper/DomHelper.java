package com.thoughtworks.fusheng.helper;

import java.util.List;

public interface DomHelper {

  public List<DomHelper> getElementsByClassName(String classname);

  public DomHelper getElementById(String id);

  public List<DomHelper> children();

  public void addClass(String classname);

  public boolean hasClass(String classname);

  public String text();

  public String getAttr(String name);

  public void setAttr(String name, String value);

  public void append(String html);

  public void empty();

}
