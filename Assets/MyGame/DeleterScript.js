#pragma strict

var blocks_in_area:Hashtable;

function Start () {
	this.blocks_in_area = new Hashtable();
}

function Update () {

}

function OnTriggerStay (other : Collider) {
	//Debug.Log('detect something.' + other.gameObject.tag);
	if (!other.gameObject.CompareTag('StaticBlock')) {
		return;
	}
	var idx = "k" + Mathf.FloorToInt(other.gameObject.transform.position.x);
	if (!this.blocks_in_area.ContainsKey(idx)) {
		this.blocks_in_area.Add(idx, other.gameObject);
	}
	//this.blocks_in_area.Add(other.gameObject, idx);
	//Debug.Log(this.blocks_in_area.Count);
	if (this.blocks_in_area.Count >= 8) {
		for (var key in this.blocks_in_area.Keys) {
			GameObject.Destroy(this.blocks_in_area[key]);
		}
		this.blocks_in_area = new Hashtable();
		var blocks = GameObject.FindGameObjectsWithTag('StaticBlock');
		for (var sblock:GameObject in blocks) {
			if (sblock.transform.position.y > this.transform.position.y) {
				sblock.transform.position.y -= 1;
			}
		}
	}
}

function OnTriggerExit (other : Collider) {
	if (!other.gameObject.CompareTag('StaticBlock')) {
		return;
	}
	var idx = "k" + Mathf.FloorToInt(other.gameObject.transform.position.x);
	this.blocks_in_area.Remove(idx);
}