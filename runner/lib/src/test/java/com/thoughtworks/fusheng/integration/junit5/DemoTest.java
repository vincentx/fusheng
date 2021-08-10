package com.thoughtworks.fusheng.integration.junit5;

@FuShengTest
public class DemoTest {
    class Splitor {
        public String firstName;
        public String lastName;

        public Splitor(String firstName, String lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }
    }

    public String getName() {
        return "司马迁";
    }

    public Splitor split(String fullName) {
        String[] splits = fullName.split(" ");
        return new Splitor(splits[0], splits[1]);
    }
}
