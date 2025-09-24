import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';  
import { AuthService } from 'src/app/services/auth.service';  
import { Router } from '@angular/router';

// O decorador @Component estava faltando. Este é o principal motivo dos erros.
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  senhaValida = true; 
  senhaLength = false;

  isLoading = false;
  showModalDelete = false;
  deletarContaVar = false;


  // Guarda os dados do usuário em um objeto para facilitar a manipulação
  usuario = {
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    plano: '',
    fotoUrl: '',
    tema: '',
    notificacoes: true
  };

  // Funções para chamar modal de sucesso/erro podem ser adicionadas aqui
  showModal = false;
  modalType: 'success' | 'error' = 'success';
  modalMessage = '';

  openSuccess(modalType: any, modalMessage: string, showModal: boolean) {
    this.modalType = modalType;
    this.modalMessage = modalMessage;
    this.showModal = showModal;
  }

  openError(modalType: any, modalMessage: string, showModal: boolean) {
    this.modalType = modalType;
    this.modalMessage = modalMessage;
    this.showModal = showModal;
  }

  closeModal() {
    this.showModal = false;
  }
 // final funções para chamar modal de sucesso/erro podem ser adicionadas aqui


  // Controla a visibilidade do modal
  abrirModalInfo = false;
  abrirModalEmail = false;
  abrirModalSenha = false;
  abrirModalTelefone = false;
  abrirModalPlano = false;
  // Armazena o nome enquanto ele está sendo editado no modal
  nomeEmEdicao = '';
  emailEmEdicao = '';
  senhaEmEdicao = '';
  telefoneEmEdicao = '';
  planoEmEdicao = '';
  planoOptions = ['Plus 1+', 'Plus 2+', 'Plus 3+'];

  // Referência ao elemento de input de arquivo no template
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private usuarioService: UsuarioService, private router: Router, private authService: AuthService) { }

   userId = localStorage.getItem('userId');

  ngOnInit(): void {
    console.log('isLoggedIn: '+this.authService.isLoggedIn());
    
    console.log('Usuário ID:', this.userId);
    this.carregarUsuario();
  }

  carregarUsuario(){
    this.usuarioService.getUsuarioComDados(this.userId || '').subscribe(data => {
    console.log("Usuário carregado: " + JSON.stringify(data)); // Exibe mensagem de sucesso    
    this.usuario.nome = data.usuario.nome;
    this.usuario.email = data.usuario.email;
    // this.usuario.senha = data.usuario.senha;
    this.usuario.telefone = data.usuario.telefone;
    this.usuario.plano = data.usuario.plano;
    // this.usuario.fotoUrl = data.usuario.fotoUrl;    
    });
  }

  // Abre o modal e copia o nome atual para o campo de edição
  editarInfo() {
    this.nomeEmEdicao = this.usuario.nome;
    this.abrirModalInfo = true;
  }

  editarEmail() {
    this.emailEmEdicao = this.usuario.email;
    this.abrirModalEmail = true;
  }

  editarSenha() {
    this.senhaEmEdicao = ''; // Não preenchemos com a senha atual por segurança
    this.abrirModalSenha = true;
  }

  editarTelefone() {
    this.telefoneEmEdicao = this.usuario.telefone;
    this.abrirModalTelefone = true;
  }

  editarPlano() {
    this.planoEmEdicao = this.usuario.plano;
    this.abrirModalPlano = true;
  }

  // Aciona o clique no input de arquivo oculto
  editarFoto() {
    this.fileInput.nativeElement.click();
  }

  // É chamado quando o usuário seleciona um arquivo
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.usuario.fotoUrl = e.target.result; // Atualiza a URL da foto com a imagem em base64
      };
      reader.readAsDataURL(file);
    }
  }

  // Salva o novo nome e fecha o modal
  salvarAlteracaoNome() {
    this.usuario.nome = this.nomeEmEdicao;
    this.abrirModalInfo = false;
    this.usuarioService.editarUsuario(this.usuario, this.userId).subscribe(() => {
    });    
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.openSuccess('success', 'Nome editado com sucesso!', true);
    }, 1000);
    setTimeout(() => {
      this.closeModal();        
    }, 2000);
  }

    salvarAlteracaoEmail() {
    // Atualiza o e-mail através do serviço para manter o estado centralizado
    this.usuario.email = this.emailEmEdicao;
    this.abrirModalEmail = false;
    this.usuarioService.editarUsuario(this.usuario, this.userId).subscribe(() => {
    });    
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.openSuccess('success', 'E-mail editado com sucesso!', true);
    }, 1000);
    setTimeout(() => {
      this.closeModal();        
    }, 2000);
  }

  salvarAlteracaoSenha() {
    if (this.senhaValida && this.senhaLength) {
          this.usuario.senha = this.senhaEmEdicao;;
        this.abrirModalSenha = false;
        this.authService.redefinirSenha(this.usuario.email, this.usuario.senha).subscribe(() => {
        });    
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
          this.openSuccess('success', 'Senha editada com sucesso!', true);
        }, 1000);
        setTimeout(() => {
          this.closeModal();        
        }, 2000);
    }

  }

  verificaPreenchimentoSenha(){
    const senha = this.senhaEmEdicao;
    // Regex para validar: mínimo 8 caracteres, 1 letra, 1 número e 1 caractere especial.
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (senha.length === 0) {
      this.senhaValida = true; // Não mostra erro se o campo estiver vazio
      this.senhaLength = false; 
    } else {
      this.senhaLength = true;
      this.senhaValida = passwordRegex.test(senha);
    }
 }

  salvarAlteracaoTelefone() {
    this.usuario.telefone = this.telefoneEmEdicao;
    this.abrirModalTelefone = false;
        this.usuarioService.editarUsuario(this.usuario, this.userId).subscribe(() => {
    });    
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.openSuccess('success', 'Telefone editado com sucesso!', true);
    }, 1000);
    setTimeout(() => {
      this.closeModal();        
    }, 2000);
  }

  salvarAlteracaoPlano() {
    this.usuario.plano = this.planoEmEdicao;
    this.abrirModalPlano = false;
    this.usuarioService.editarUsuario(this.usuario, this.userId).subscribe(() => {
    });    
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.openSuccess('success', 'Plano editado com sucesso!', true);
    }, 1000);
    setTimeout(() => {
      this.closeModal();        
    }, 2000);
  }

  // Apenas fecha o modal, descartando alterações
  fecharModal() {
    this.abrirModalInfo = false;
  }

  fecharModalEmail() {
    this.abrirModalEmail = false;
  }

  fecharModalSenha() {
    this.abrirModalSenha = false;
  }

  fecharModalTelefone() {
    this.abrirModalTelefone = false;
  }

  fecharModalPlano() {
    this.abrirModalPlano = false;
  }

  deletarConta(){
    this.showModalDelete = true;
  }

  confirmarDelete(){
    this.deletarContaVar = true;
    this.showModalDelete = false;
    // const confirmacao = confirm('Tem certeza que deseja deletar esta meta?');
    if (this.deletarContaVar) {
      this.usuarioService.deletarUsuario(this.userId || '').subscribe(() => {
        // this.carregarMetas();  
        // this.fecharModalDetalhes();
      });

    this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.openSuccess('success', 'Usuário deletado com sucesso!', true);
      }, 1000);

      setTimeout(() => {
        this.closeModal();
        this.router.navigate(['/']);  
        this.userId = '';
        localStorage.removeItem('userId');
        // this.carregarMetas(); 
      }, 2000);

      
    
    }
  }

  cancelarDelete(){
    this.deletarContaVar = false;
    this.showModalDelete = false;
  }

}
