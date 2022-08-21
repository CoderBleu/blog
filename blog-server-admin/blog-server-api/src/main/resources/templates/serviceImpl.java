package templates;

{package.ServiceImpl};

{package.Entity}.${entity};
{package.Mapper}.${table.mapperName};
import ${package.Service}.${table.serviceName};
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

/**
*  Service业务逻辑处理 : ${table.comment}
*  @author
*  @date ${date}
*  @description
*/
@Service
public class ${table.serviceImplName} extends ServiceImpl<${table.mapperName}, ${entity}> implements ${table.serviceName} {
	
	@Autowired
	private ${table.mapperName} ${table.entityPath}Mapper;



}

