/**
*  模拟分页逻辑
*/
module.exports = function (json, req) {
	// 请求参数
	let query = req.query;
	// 返回的 json结果
	let result = json.result;

	if(query.total === '1'){
		result.total = result.data.length
	}
	else{
		delete result.total;
	}

	// 过滤逻辑
	result.data = result.data.splice(query.offset, query.limit || 10);
	
	return json;
}