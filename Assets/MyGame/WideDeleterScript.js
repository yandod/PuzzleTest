﻿#pragma strict

	var blocks_table:Array;
	var y_offset = -8.5;
	var CountTexts:Array;

function Start () {
	this.blocks_table = new Array();
	this.CountTexts = new Array();
	for (var i:int = 0; i<20;i++) {
		//this.blocks_table[i] = 0;
		this.CountTexts[i] = Instantiate(
			Resources.Load('BlocksCount', GameObject),
			new Vector3(4.7, -8.5 + i, -0.5),
			Quaternion.identity
		);
	}

}

function Update () {

	var totals = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var blocks = GameObject.FindGameObjectsWithTag('StaticBlock');
	
	//check phase
	for (var sblock:GameObject in blocks) {
		var xidx = Mathf.FloorToInt(sblock.transform.position.x) + 4;
		var yidx = Mathf.FloorToInt(sblock.transform.position.y) + 10;
		if (yidx >= 0 && yidx < 20 && xidx >= 0 && xidx < 8) {
		    totals[yidx]++;
		}
	}
	
	//summary phase
	var target_lines = new Array();
	for (var i:int = 0; i<20;i++) {
		//var total = 0;
		//for (var j:int = 0; j<8; j++) {
			//total += this.blocks_table[xidx,yidx];
		//}
		var obj:GameObject = this.CountTexts[i];
		var mesh:TextMesh = obj.GetComponent('TextMesh');
		mesh.text = totals[i].ToString();
		if (totals[i] >= 8) {
			target_lines.Add(i);
		}
	}
	
	//destroy phase
	target_lines.Sort();
	for (var sblock:GameObject in blocks) {
		var xidx2 = Mathf.FloorToInt(sblock.transform.position.x) + 4;
		var yidx2 = Mathf.FloorToInt(sblock.transform.position.y) + 10;
		for (var target_line in target_lines) {
			if (target_line == yidx2 && xidx >= 0 && xidx < 8) {
				Destroy(sblock);
				if (xidx2 == 4 && target_lines.length > 1) {
				var instance : GameObject = Instantiate(
					Resources.Load('CrashEffect', GameObject),
					new Vector3(0, yidx -9, -1),
					Quaternion.identity
				);
				}
			}
		}
	}
	
	//sort phase
	var target_line_offset = 0;
	for (var target_line:int in target_lines) {
		for (var sblock:GameObject in blocks) {
			var yidx3 = Mathf.FloorToInt(sblock.transform.position.y) + 10;
			if (yidx3 > (target_line - target_line_offset)) {
				//sblock.transform.position += Vector3.down;
				if (sblock.GetComponent('Rigidbody')==null) {
					sblock.AddComponent('Rigidbody');
				}
				var rb:Rigidbody = sblock.GetComponent('Rigidbody');
				
				//if (target_lines.length == 1) {
				//	rb.constraints = RigidbodyConstraints.FreezeAll ^ RigidbodyConstraints.FreezePositionY;
				//} else {
				//	rb.constraints = RigidbodyConstraints.None;
				//}
				//rb.constraints = RigidbodyConstraints.FreezeAll ^ RigidbodyConstraints.FreezePositionY;
				//sblock.rigidbody.constraints = RigidbodyConstraints.FreezeAll ^ RigidbodyConstraints.FreezePositionY;
			}
		}	
		target_line_offset++;
	}

}