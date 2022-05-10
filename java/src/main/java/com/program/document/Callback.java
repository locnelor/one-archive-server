package com.program.document;

import org.apache.poi.xwpf.usermodel.XWPFTable;

import java.io.IOException;
import java.text.ParseException;

public interface Callback {
    public String run(Event e) throws ParseException, IOException;
}
