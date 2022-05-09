package com.program.document;

import com.program.utils.Temperature;
import org.apache.poi.xwpf.usermodel.*;
import org.apache.xmlbeans.XmlException;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTRow;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

public class Event {
    private final XWPFDocument doc;
    private final XWPFTable table;
    public final List<XWPFTableRow> rows;
    private int point;
    private final File file;

    public Event(File file) throws IOException {
        this.file = file;
        this.doc = new XWPFDocument(new FileInputStream(file));
        List<XWPFTable> tables = doc.getTables();
        this.table = tables.get(tables.size() - 1);
        this.rows = this.table.getRows();
        this.point = this.rows.size() - 1;
        // 删除无效行
        for (; this.point > 0; this.point--) {
            XWPFTableRow row = this.rows.get(this.point);
            XWPFTableCell cell = row.getCell(0);
            String text = cell.getText();
            if (!text.equals("")) {
                break;
            }
            this.table.removeRow(this.point);
        }
    }
    public XWPFTableRow getCurrent(){
        return this.rows.get(this.point);
    }
    public void add(String date) throws XmlException, IOException {
        XWPFTableRow current = this.getCurrent();
        CTRow ctrow = CTRow.Factory.parse(current.getCtRow().newInputStream());
        XWPFTableRow newRow = new XWPFTableRow(ctrow,this.table);
        this.setText(newRow.getCell(0),date);
        this.setText(newRow.getCell(1), Temperature.random());
        this.table.addRow(newRow);
        this.point ++;
    }
    public void setText(XWPFTableCell cell,String text){
        cell.removeParagraph(0);
        cell.addParagraph().setAlignment(ParagraphAlignment.CENTER);
        cell.setText(text);
    }


}
