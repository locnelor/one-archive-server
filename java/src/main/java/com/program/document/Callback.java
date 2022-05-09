package com.program.document;

import org.apache.poi.xwpf.usermodel.XWPFTable;

public interface Callback {
    public boolean run(Event e);
}
