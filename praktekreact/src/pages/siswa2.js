import React from 'react'
import axios from 'axios'
import NavBar from '../components/navbar'
import {Button, Modal, Card, Table, Form} from 'react-bootstrap'

class Siswa extends React.Component {
    constructor() {  
        super();  
        this.state = {  
          token: "",
          siswa: [], 
          jur: [], 
          id_siswa : "",
          nis : "",
          nama_siswa: "",
          kelas: "",
          jurusan: "",
          poin: "",
          search: "",
          action: "",
          isModal10open: false
          }  
          if (localStorage.getItem("token")) {
          this.state.token = localStorage.getItem("token")
          } else {
          window.location = "/login"
          }

      this.headerConfig.bind(this) 

    }
    headerConfig = () => {
      let header = {
          headers: { Authorization: `Bearer ${this.state.token}` }
      }
      return header
  }

    
    bind = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    handleAdd = () => {
        this.setState({
            id_siswa : "",
            nis : "",
            nama_siswa: "",
            kelas: "",
            jurusan: "",
            poin: "",
            action: "insert",
            isModalOpen: true
        })
    }
    handleEdit = (item) => {
      this.setState({
                  id_siswa: item.id_siswa,
                  nis: item.nis,
                  nama_siswa: item.nama_siswa,
                  kelas: item.kelas,
                  jurusan: item.jurusan,
                  poin: item.poin,
                  action: "update",
                  isModalOpen: true
      })
  }
    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }
    handleSave = (event) => {
      event.preventDefault();
      let url = "";
      if (this.state.action === "insert") {
        url = "http://localhost:2000/siswa/save"
      } else {
        url = "http://localhost:2000/siswa/update"
      }
      let form = {
          id_siswa: this.state.id_siswa,
          nis: this.state.nis,
          nama_siswa: this.state.nama_siswa,
          kelas: this.state.kelas,
          jurusan: this.state.jurusan,
          poin: this.state.poin
        }
        // mengirim data ke API untuk disimpan pada database
        axios.post(url, form, this.headerConfig())
        .then(response => {
        // jika proses simpan berhasil, memanggil data yang terbaru
        this.getSiswa();
        this.getJurusan();
        })
        this.setState({
          isModalOpen: false
      })
      }
    getSiswa = () => {
      let url = "http://localhost:2000/siswa";
      // mengakses api untuk mengambil data pegawai
      axios.get(url, this.headerConfig())
      .then(response => {
        // mengisikan data dari respon API ke array pegawai
        this.setState({siswa: response.data.siswa});
      })
      .catch(error => {
        console.log(error);
      });
  }
    
  getJurusan = () => {
    let url = "http://localhost:2000/siswa/jurusan";
    // mengakses api untuk mengambil data siswa
    axios.get(url, this.headerConfig())
    .then(response => {
      // mengisikan data dari respon API ke array siswa
      this.setState({jur: response.data.jurusan});
    })
    .catch(error => {
      console.log(error);
    });
}

  componentDidMount(){
      // method yang pertama kali dipanggil pada saat load page
      this.getSiswa()
      this.getJurusan()
  }
    findSiswa = (event) => {
        let url = "http://localhost:2000/siswa";
        if (event.keyCode === 13) {
        //   menampung data keyword pencarian
          let form = {
            find: this.state.search
          }
          // mengakses api untuk mengambil data pegawai
          // berdasarkan keyword
          axios.post(url, form, this.headerConfig)
          .then(response => {
            // mengisikan data dari respon API ke array pegawai
            this.setState({siswa: response.data.siswa});
          })
          .catch(error => {
            console.log(error);
          });
        }
    }

    Drop = (id_siswa) => {
        let url = "http://localhost:2000/siswa/" + id_siswa;
        if (window.confirm('YAKIN MAU DIHAPUS?')) {
          axios.delete(url, this.headerConfig())
          .then(response => {
            this.getSiswa();
          })
          .catch(error => {
            console.log(error);
          });
        }
    }
    

    render(){
      console.log(this.state.siswa)
        return(
            <>
            <NavBar />
            <h1>Daftar Siswa</h1>
                <Card>
                <Card.Header className="card-header bg-info text-white" align={'center'}>Daftar Siswa</Card.Header>
                <Card.Body>
                <input type="text" className="form-control mb-2" name="search" value={this.state.search} onChange={this.bind} onKeyUp={this.findSiswa} placeholder="Pencarian..." />
                <Button variant="success" onClick={this.handleAdd}>
                    Tambah Data
                </Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID Siswa</th>  
                            <th>NIS</th>  
                            <th>Nama</th>  
                            <th>Kelas</th>  
                            <th>Jurusan</th>  
                            <th>Poin</th> 
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.siswa.map((item,index) => {  
                        return (  
                        <tr key={index}>  
                            <td>{item.id_siswa}</td>  
                            <td>{item.nis}</td>  
                            <td>{item.nama_siswa}</td>  
                            <td>{item.kelas}</td>  
                            <td>{item.jurusan}</td>  
                            <td>{item.poin}</td>
                            <td>  
                            <Button className="btn btn-sm btn-info m-1" data-toggle="modal"  
                            data-target="#modal" onClick={() => this.handleEdit(item)}>  
                                Edit  
                            </Button>  
                            <Button className="btn btn-sm btn-danger m-1" onClick={() => this.Drop(item.id_siswa)}>  
                                Hapus  
                            </Button>  
                            </td>  
                        </tr>  
                        );  
                    })}
                    </tbody>
                    </Table>
                </Card.Body>
                </Card>
                
                <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Form Siswa</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.handleSave}> 
                    <div className="modal-body">  
                        ID Siswa  
                        <input type="text" name="id_siswa" value={this.state.id_siswa} onChange={this.bind}  
                        className="form-control" required />  
                        NIS
                        <input type="text" name="nis" value={this.state.nis} onChange={this.bind}  
                        className="form-control" required />  
                        Nama Siswa
                        <input type="text" name="nama_siswa" value={this.state.nama_siswa} onChange={this.bind}  
                        className="form-control" required />  
                        Kelas 
                        <input type="text" name="kelas" value={this.state.kelas} onChange={this.bind}  
                        className="form-control" required />  
                        Jurusan
                        <select name="jurusan" value={this.state.jurusan} onChange={this.bind} className="form-control" required>
                        {this.state.jur.map((item)=> {  
                        return ( <option value={item.id_jurusan}>{item.nama_jurusan}</option> )})}
                       </select>  
                        Poin 
                        <input type="number" name="poin" value={this.state.poin} onChange={this.bind}  
                        className="form-control" required /> 
                    </div>  
                    <div className="modal-footer">  
                        <button className="btn btn-sm btn-success" type="submit">  
                            Simpan  
                        </button>  
                    </div>  
                    </Form> 
                </Modal>
            </>

    );  
  }
}

export default Siswa
