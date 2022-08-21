package com.blog.business.utils.generator;

import com.baomidou.mybatisplus.core.exceptions.MybatisPlusException;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.InjectionConfig;
import com.baomidou.mybatisplus.generator.config.*;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;
import com.baomidou.mybatisplus.generator.engine.FreemarkerTemplateEngine;
import com.blog.business.common.model.BaseModel;

import java.util.Scanner;


/**
 * 代码生成器工具类
 */
public class CodeGeneratorUtil {

    private String url;

    private String userName;

    private String password;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public CodeGeneratorUtil(String url, String userName, String password) {
        this.url = url;
        this.userName = userName;
        this.password = password;
    }

    public static String scanner(String tip) {
        Scanner scanner = new Scanner(System.in);
        StringBuilder help = new StringBuilder();
        help.append("请输入" + tip + "：");
        System.out.println(help.toString());
        if (scanner.hasNext()) {
            String ipt = scanner.next();
            if (StringUtils.isNotBlank(ipt)) {
                return ipt;
            }
        }
        throw new MybatisPlusException("请输入正确的" + tip + "！");
    }

    public static DataSourceConfig dataSourceConfigBuild(CodeGeneratorUtil codeGeneratorUtil) {
        DataSourceConfig dataSourceConfig = new DataSourceConfig();
        dataSourceConfig.setUrl(codeGeneratorUtil.getUrl());
        dataSourceConfig.setSchemaName("public");
        dataSourceConfig.setDriverName("com.mysql.cj.jdbc.Driver");
        dataSourceConfig.setUsername("root");
        dataSourceConfig.setPassword("root");
        return dataSourceConfig;
    }

    /**
     *
     * @param dataSourceConfig
     * @param parent /blog-server-api/src/main/java/com/blog/business
     * @param moduleName 新建模版名
     */
    public static void codeGenerator(DataSourceConfig dataSourceConfig, String parent, String moduleName) {
        // 代码生成器
        AutoGenerator mpg = new AutoGenerator();

        // 全局配置
        GlobalConfig gc = new GlobalConfig();
        String projectPath = System.getProperty("user.dir");// 获取当前路径
        gc.setOutputDir(projectPath + "/blog-server-api/src/main/java");
        gc.setOpen(false);// 是否打开输出目录
        gc.setFileOverride(true);//是否重写
        gc.setActiveRecord(true);// 开启 activeRecord 模式
        gc.setEnableCache(false);// XML 二级缓存
        gc.setBaseResultMap(true);// XML ResultMap
        gc.setBaseColumnList(false);// XML columList
        gc.setAuthor("Mybatis Plus Code Generator"); // 设置作者名称
        gc.setServiceName("%sService");
        mpg.setGlobalConfig(gc);

        // 数据源配置
//        DataSourceConfig dsc = new DataSourceConfig();
//        dsc.setUrl("jdbc:mysql://127.0.0.1:3306/blog?useUnicode=true&serverTimezone=UTC&useUnicode=true&characterEncoding=utf8&useSSL=false");
//        // dsc.setSchemaName("public");
//        dsc.setDriverName("com.mysql.cj.jdbc.Driver");
//        dsc.setUsername("root");
//        dsc.setPassword("root");
        mpg.setDataSource(dataSourceConfig);

        // 包配置
        PackageConfig pc = new PackageConfig();
        // "demo"
        pc.setModuleName(moduleName);
        // "com.blog.business"
        pc.setParent(parent);
        pc.setMapper("dao");
        pc.setEntity("model");
        mpg.setPackageInfo(pc);

        // 自定义配置
        InjectionConfig cfg = new InjectionConfig() {
            @Override
            public void initMap() {
                // to do nothing
            }
        };


        // 配置模板
        TemplateConfig templateConfig = new TemplateConfig();

        // 设置为null时，则不会生成xml文件，controller、service等Java类
        templateConfig
                // 自定义模板
                .setEntity("/templates/entity.java")		        				// 设置生成entity的模板
                .setMapper("/templates/mapper.java")		        				// 设置生成mapper的模板
                .setController("")   // 不设置生成Controller的模板
                .setXml("")
                .setService("/templates/service.java")							// 设置生成service的模板
                .setServiceImpl("/templates/serviceImpl.java");					// 设置生成serviceImpl的模板
        mpg.setTemplate(templateConfig);

        // 策略配置
        StrategyConfig strategy = new StrategyConfig();
        // 表名生成策略：下划线连转驼峰
        strategy.setNaming(NamingStrategy.underline_to_camel);
        // 表字段生成策略：下划线连转驼峰
        strategy.setColumnNaming(NamingStrategy.underline_to_camel);
        // 是否为lombok模型; 需要lombok依赖
        strategy.setEntityLombokModel(false);
        // 生成controller
        strategy.setRestControllerStyle(true);
//        strategy.setControllerMappingHyphenStyle(true); //url中驼峰转连字符
        strategy.setInclude(scanner("表名，多个英文逗号分割").split(","));
        strategy.setSuperEntityClass(BaseModel.class);
        // controller映射地址：驼峰转连字符
        strategy.setControllerMappingHyphenStyle(true);
        strategy.setTablePrefix("t_");

        mpg.setStrategy(strategy);
        mpg.setTemplateEngine(new FreemarkerTemplateEngine());
        mpg.execute();
    }
}


