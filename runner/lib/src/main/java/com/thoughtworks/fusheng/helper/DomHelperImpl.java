package com.thoughtworks.fusheng.helper;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Attributes;
import org.jsoup.nodes.Element;

import java.util.List;
import java.util.stream.Collectors;

public class DomHelperImpl implements DomHelper {
  private Element element;

  public DomHelperImpl(Element element) {
    this.element = element;
  }

  public static DomHelperImpl of(Element element) {
    return new DomHelperImpl(element);
  }

  @Override
  public List<DomHelper> getElementsByClassName(String classname) {
    return element
            .getElementsByClass(classname)
            .stream()
            .map(DomHelperImpl::of)
            .collect(Collectors.toList());
  }

  @Override
  public DomHelper getElementById(String id) {
    return new DomHelperImpl(Jsoup.parse(element.getElementById(id).html()));
  }

  @Override
  public List<DomHelper> children() {
    return element
            .children()
            .stream()
            .map(DomHelperImpl::of)
            .collect(Collectors.toList());
  }

  @Override
  public void addClass(String classname) {
    element.addClass(classname);
  }

  @Override
  public boolean hasClass(String classname) {
    return element.hasClass(classname);
  }

  @Override
  public String text() {
    return element.text();
  }

  @Override
  public String getAttr(String name) {
    Attributes attributes = element.attributes();
    return attributes.get(name);
  }

  @Override
  public void setAttr(String name, String value) {
    element.attr(name, value);
  }

  @Override
  public void append(String html) {
    element.append(html);
  }

  @Override
  public void empty() {
    element.empty();
  }
}
