package com.thoughtworks.fusheng.helper;

import org.jsoup.nodes.Element;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

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
  public List<DomHelper> getElementsByTag(String tag) {
    return element
            .getElementsByTag(tag)
            .stream()
            .map(DomHelperImpl::of)
            .collect(Collectors.toList());
  }

  @Override
  public DomHelper getElementById(String id) {
    return DomHelperImpl.of(element.getElementById(id));
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
    return element.attributes().get(name);
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
  public void setText(String text) {
    element.appendText(text);
  }

  @Override
  public void empty() {
    element.empty();
  }

  @Override
  public List<NameValuePair> getAttributes() {
    return StreamSupport.stream(element.attributes().spliterator(), false)
            .map(attribute -> new NameValuePair(attribute.getKey(), attribute.getValue()))
            .collect(Collectors.toList());
  }

  @Override
  public void removeAttributes() {
      element.clearAttributes();
  }
}
