package com.program.utils;

public class Judge {
    public static boolean isLetterChar(int c) {
        return (c >= 65 && c <= 90) || (c >= 97 && c <= 122);
    }
    public static boolean isNumberChar(int c){
        return c >= 48 && c <= 57;
    }
}
