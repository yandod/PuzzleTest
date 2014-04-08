#pragma strict

	var running_game:boolean = true;
	var block_types:Array;
	var finish:GameObject;

function Start () {
	this.block_types = new Array();
	this.block_types.Add('TBlock');
	this.block_types.Add('ZBlock');
	this.block_types.Add('LBlock');
	this.block_types.Add('IBlock');
	
	for (var i = 0 ; i < 20; i++) {
		Instantiate(
			Resources.Load('deleter', GameObject),
			new Vector3(0, -9.5 + i, -0.8),
			Quaternion.identity
		);
	}
}

function Update () {

	var moving_block =  GameObject.FindWithTag ("MovingBlock");

	if (moving_block == null && this.running_game) {
	
		var next_block = this.block_types[Random.Range(0, this.block_types.length)];
		var instance : GameObject = Instantiate(
			Resources.Load(next_block, GameObject),
			new Vector3(-0.5, 13, -1),
			Quaternion.identity
		);
		instance.tag = 'MovingBlock';
	
	}
	//var obj = Instantiate(tblock,new Vector3(-1.5, 5, -3), Quaternion.identity);
	//obj.name = 'block';
}

function OnCollisionStay (other : Collision) {
	if (other.gameObject.CompareTag('Block')) {
		Debug.Log('Dead!');
		this.active = false;
		finish.active = true;
	}
}