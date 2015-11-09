var triSideType = ["普通","等腰","等边"];
var triAngType = ["锐角","直角","钝角"];

var settlePara = function(paraA,paraB,paraC){
	//假设三个参数已经满足条件1~200，如今只判断是否构成三角形
	var describtion = "";
	var triangleArray = [];
	for(var i=0;i<arguments.length;i++){
		triangleArray.push(arguments[i]);
	}
	console.log(triangleArray);
	//冒泡排个序
	triangleArray = bubbleSort(triangleArray);
	console.log(triangleArray);

	//判断三角形
	if(triangleArray[0] + triangleArray[1] > triangleArray[2]){
		console.log("It's a triangle!");

		if(triangleArray[0] == triangleArray[1] && triangleArray[1] == triangleArray[2]){
			//等边
			describtion = describtion + triSideType[2];
			console.log("1=1=1");
		
		}else if(triangleArray[0] == triangleArray[1] || triangleArray[1] == triangleArray[2]){
			//等腰
			describtion = describtion + triSideType[1];
			console.log("1=1");
		}else{
			describtion = describtion + triSideType[0];
		}

		if(Math.pow(triangleArray[0],2) + Math.pow(triangleArray[1],2) == Math.pow(triangleArray[2],2)){
			//直角
			console.log("90C");
			describtion = describtion + triAngType[1];
		}else if(Math.pow(triangleArray[0],2) + Math.pow(triangleArray[1],2) > Math.pow(triangleArray[2],2)){
			describtion = describtion + triAngType[0];
		}else{
			describtion = describtion + triAngType[2];
		}

		
		describtion = describtion + "三角形";

		//提交给画布，画出三角形
		drawTriangle(paraA,paraB,paraC);

	}else{
		describtion = "不是一个三角形";
	}

	return {describ:describtion};
}


var bubbleSort = function(ary){

	for(var i=ary.length-1;i>0;i--){
		for(var j=0;j<i;j++){
			if(ary[j]>ary[j+1]){
				var temp = ary[j];
				ary[j] = ary[j+1];
				ary[j+1] = temp;
			}
		}
	}

	return ary;
}

/*var testAry = [2,5,3,6,7,8,1,23,15];
testAry = bubbleSort(testAry);
console.log(testAry);*/
/*settlePara(1,2,3);
settlePara(3,2,1);
settlePara(5,4,3)
settlePara(4,4,3)*/
var drawTriangle = function(AB,BC,CA){
	//余弦定理算角度
	var powMinus = Math.pow(AB,2) + Math.pow(BC,2) - Math.pow(CA,2);
	var cosB = powMinus/(2*AB*BC);
	var angleB = Math.acos(cosB);//弧度
	console.log("B角角度为"+angleB/Math.PI * 180);
	var cX = 0;
	var cY = 0;

	if(angleB < Math.PI/2){
		angleB = Math.PI/2 - angleB;
		cX = BC * Math.cos(angleB);
		cY = Math.pow(BC,2) - Math.pow(cX,2);
		cY = -Math.sqrt(cY);
	}else if(angleB > Math.PI/2){
		angleB = angleB - Math.PI/2;
		cX = BC * Math.cos(angleB);
		cY = Math.pow(BC,2) - Math.pow(cX,2);
		cY = Math.sqrt(cY);
	}else{
		cX = BC;
		cY = 0;
	}

	//遮盖层
	var canvas = document.getElementById("Mycanvas");
	var context = canvas.getContext("2d");
	context.beginPath();
	context.fillStyle = "rgb(255,255,255)";
	context.fillRect(0,0,500,500);
	context.fill();
	context.closePath();
	context.stroke();

	//为了直观显示，*2做一个扩大化处理
	context.beginPath();
	context.fillStyle = "rgb(100,150,185)";
	context.font = "30px Courier New";
	context.fillText("A",100,100-10);
	context.moveTo(100,100);
	context.fillText("B",100-20,100+AB*2);
	context.lineTo(100,100+AB*2);
	context.fillText("C",100+cX*2,100+AB*2+cY*2);
	context.lineTo(100+cX*2,100+AB*2+cY*2);
	context.fill();
	context.closePath();
	context.stroke();

}