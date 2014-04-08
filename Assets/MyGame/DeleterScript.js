#pragma strict

var blocks_in_area:Hashtable;

function Start () {
	this.blocks_in_area = new Hashtable();
}

function Update () {
	var text:TextMesh = this.transform.GetChild(0).gameObject.GetComponent('TextMesh');
	var c:int = blocks_in_area.Count;
	text.text = c.ToString();
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
		var blocks = GameObject.FindGameObjectsWithTag('StaticBlock');
		for (var sblock:GameObject in blocks) {
		//sblock.transform.TransformPoint(sblock.transform.position).y
			if (
				sblock.transform.position.y
				//sblock.transform.parent.transform.TransformPoint(sblock.transform.position).y 
				>
				this.transform.position.y
				//this.transform.TransformPoint(this.transform.position).y
			) {
				//sblock.transform.position += sblock.transform.parent.transform.TransformDirection(Vector3.down);
				//sblock.transform.position += Vector3.down;
			}
		}
		this.blocks_in_area.Clear();
	}
}

function OnTriggerExit (other : Collider) {
	if (!other.gameObject.CompareTag('StaticBlock')) {
		return;
	}
	var idx = "k" + Mathf.FloorToInt(other.gameObject.transform.position.x);
	this.blocks_in_area.Remove(idx);
}

function OnCollisionExit(other : Collision) {
	if (!other.gameObject.CompareTag('StaticBlock')) {
		return;
	}
	Debug.Log('block Exit');
	var idx = "k" + Mathf.FloorToInt(other.gameObject.transform.position.x);
	this.blocks_in_area.Remove(idx);
}
	