package fusheng;

import org.junit.Test;
import org.springframework.web.util.UriTemplate;

import static org.junit.Assert.assertTrue;

public class FushengHttpHandlerTest{

    private Boolean isValidUri(String realUri, String templateUri) {
        String flag = "/fusheng";
        int prefixURIIndex = realUri.indexOf(flag);
        String prefixURI = realUri.substring(0, prefixURIIndex);
        UriTemplate template = new UriTemplate(prefixURI + flag + templateUri);
        return template.matches(realUri);
    }

    @Test
    public void should_return_true_given_valid_uri() {
        String realUri = "http://localhost:8080/fusheng/specs/xxxxx.txt";
        String template = "/specs/{pathName}";
        assertTrue(isValidUri(realUri, template));
    }
}
