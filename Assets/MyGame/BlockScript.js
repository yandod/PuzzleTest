#pragma strict

	var is_moving:boolean = true;
	var is_nutral:boolean = true;

function Start () {
	this.is_moving = true;
}

function Update () {

	if (this.transform.GetChildCount == 0) {
		Destroy(this);
	}

	if (!this.is_moving) {
		return;
	}

	this.transform.position =
		Vector3(
			Mathf.Floor(this.transform.position.x) + 0.5,
			this.transform.position.y,
			this.transform.position.z
		);

	if (Input.GetAxis('Horizontal') > 0 && this.is_nutral) {
		this.transform.position += Vector3.right; 
		this.is_nutral = false;
	}
	
	if (Input.GetAxis('Horizontal') < 0 && this.is_nutral) {
		this.transform.position += Vector3.left;
		this.is_nutral = false;
	}
	
	if (Input.GetAxis('Vertical') > 0 && this.is_nutral) {
		this.transform.Rotate(0, 0, 90);
		this.is_nutral = false;
	}
	
	if (Input.GetAxis('Horizontal') == 0 && Input.GetAxis('Vertical') == 0) {
		this.is_nutral = true;
	}
	
	this.transform.position += Vector3.down * 0.1;
	
	if (this.transform.position.y < -15) {
		this.transform.position.y = 13;
		this.transform.position.x = -0.5;
	}
	

}

function OnCollisionEnter (other: Collision) {
	if (other.gameObject.CompareTag('Player')) {
		return;
	}
	this.is_moving = false;
	this.tag = 'Block';
	
	var childCount:int = transform.GetChildCount();
	for ( var i:int = 0; i < childCount; i++) {
		this.transform.GetChild(i).tag = 'StaticBlock';
	}
	
	this.transform.position =
		Vector3(
			Mathf.Floor(this.transform.position.x) + 0.5,
			Mathf.Floor(this.transform.position.y) + 0.5,
			this.transform.position.z
		);
	//Debug.Log('Block Landed.');
}