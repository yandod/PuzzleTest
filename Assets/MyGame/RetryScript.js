#pragma strict

var spawner:GameObject;

function Start () {

	var blocks = GameObject.FindGameObjectsWithTag('StaticBlock');
	
	//check phase
	for (var sblock:GameObject in blocks) {
		if (sblock.GetComponent('Rigidbody') == null) {
			sblock.AddComponent('Rigidbody');
		}
		var rb:Rigidbody = sblock.GetComponent('Rigidbody');
		rb.AddForce(Vector3.forward);		
	}

}

function Update () {


	if (Input.GetKeyDown(KeyCode.Space) || Input.GetButtonDown('Jump')) {
		var blocks:GameObject[] = GameObject.FindGameObjectsWithTag('Block');
		for (var block in blocks) {
			Destroy(block);
		}
		spawner.active = true;
		this.active =false;
	}

}