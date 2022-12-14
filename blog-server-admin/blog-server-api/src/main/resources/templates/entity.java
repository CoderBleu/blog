package templates;

{package.Entity};

<#---->
import com.baomidou.mybatisplus.annotation.*;

<#list table.importPackages as pkg>
    <#if pkg == "java.math.BigDecimal">
import ${pkg};
    </#if>
    <#if pkg == "java.time.LocalDateTime">
</#if>
</#list>

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
*  ${table.name} : ${table.comment!}
*  @author ${author}
*  @since ${date}
*/
@TableName("${table.name}")
public class ${entity} extends Model<${entity}> {

	private static final long serialVersionUID = 1L;
<#-- ----------  属性私有化  ---------->
<#list table.fields as field>
    <#if field.keyFlag>
        <#assign keyPropertyName="${field.propertyName}"/>
    </#if>

    <#if field.keyFlag>
    <#-- 主键 -->
    /**
     * 主键 : ${field.name}  ${field.comment!}
     */
    @TableId(value = "${field.name}", type = IdType.AUTO)
    <#-- 普通字段 -->

    <#elseif !field.keyFlag>
    /**
     * ${field.name}: ${field.comment!}
     */
    </#if>
<#-- 乐观锁注解 -->
    <#if (versionFieldName!"") == field.name>
    @Version
    </#if>
<#-- 逻辑删除注解 -->
    <#if (logicDeleteFieldName!"") == field.name>
    @TableLogic
    </#if>

    <#if field.propertyType == "LocalDateTime">
    private Date ${field.propertyName};
    </#if>

    <#if field.propertyType != "LocalDateTime">
    private ${field.propertyType} ${field.propertyName};
    </#if>
</#list>

}

