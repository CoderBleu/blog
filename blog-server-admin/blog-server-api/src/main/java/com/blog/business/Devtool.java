package com.blog.business;

import com.blog.business.utils.generator.CodeGeneratorUtil;

/**
 * 代码生成器
 */
public class Devtool {

    private static final CodeGeneratorUtil generatorUtil =
            new CodeGeneratorUtil("jdbc:mysql://127.0.0.1:3306/blog?useUnicode=true&serverTimezone=UTC&useUnicode=true&characterEncoding=utf8&useSSL=false",
                    "root",
                    "root");

    public static void main(String[] args) {

        /**
         * parent /blog-server-api/src/main/java/com/blog/business
         * 新建模版名 demo
         */
        CodeGeneratorUtil.codeGenerator(CodeGeneratorUtil.dataSourceConfigBuild(generatorUtil),
                "com.blog.business.blog", "demo");
    }

}
