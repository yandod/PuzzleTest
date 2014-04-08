#pragma strict

var spawner:GameObject;

function Start () {

}

function Update () {

	if (Input.GetKeyDown(KeyCode.Space)) {
		var blocks:GameObject[] = GameObject.FindGameObjectsWithTag('Block');
		for (var block in blocks) {
			Destroy(block);
		}
		spawner.active = true;
		this.active =false;
	}

}